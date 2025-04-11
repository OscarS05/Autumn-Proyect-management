const boom = require('@hapi/boom');

const { cardAttachmentService } = require('../../application/services/index');

const getAllCardAttachments = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const cardAttachments = await cardAttachmentService.getAllCardAttachments(cardId);

    res.status(200).json({ cardAttachments });
  } catch (error) {
    next(error);
  }
}

const saveCardAttachment = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    if (req.file) {
      const { path, filename, originalname, mimetype } = req.file;
      if(!filename) throw boom.badRequest('File upload failed. The filename is null');

      const newCardAttachment = await cardAttachmentService.saveCardAttachment({
        cardId,
        filename: originalname,
        type: mimetype,
        url: path,
        publicId: filename
      });

      return res.status(201).json({ message: "The attachment was saved successfully", newCardAttachment });
    }

    if (req.body) {
      const { url, filename } = req.body;

      const newAttachment = await cardAttachmentService.saveCardAttachment({
        cardId,
        filename,
        type: 'external-link',
        url,
        publicId: null
      });

      return res.status(201).json({ message: "The attachment was saved successfully", newAttachment });
    }

    res.status(400).json({ message: 'You must send a file or a URL' });
  } catch (error) {
    next(error);
  }
}

const updateCardAttachment = async (req, res, next) => {
  try {
    const { cardId, attachmentId } = req.params;
    const cardAttachmentData = req.body;

    const upadedCard = await cardAttachmentService.updateCardAttachment(cardId, attachmentId, cardAttachmentData);

    res.status(200).json({ message: 'The card attachment was successfully updated', upadedCard});
  } catch (error) {
    next(error);
  }
}

const deleteCardAttachent = async (req, res, next) => {
  try {
    const { cardId, attachmentId } = req.params;

    const deletedCard = await cardAttachmentService.deleteCardAttachment(cardId, attachmentId);

    res.status(200).json({ message: 'The card attachment was successfully removed', deletedCard});
  } catch (error) {
    next(error);
  }
}

const downloadCardAttachment = async (req, res, next) => {
  try {
    const { cardId, attachmentId } = req.params;

    const attachment = await cardAttachmentService.getCardAttachmentById(cardId, attachmentId);
    if (!attachment?.id) throw boom.notFound('Attachment not found or does not belong to the card');
    if (attachment.type === 'external-link') throw boom.badRequest('Cannot download external links');

    const fileUrl = attachment.url;

    const https = require('https');
    https.get(fileUrl, (fileRes) => {
      res.setHeader('Content-Type', attachment.type);
      res.setHeader('Content-Disposition', `attachment; filename="${attachment.filename}"`);

      fileRes.pipe(res);
    }).on('error', (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCardAttachments,
  saveCardAttachment,
  updateCardAttachment,
  deleteCardAttachent,
  downloadCardAttachment,
}
