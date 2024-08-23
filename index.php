<?php include('config/config.php'); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autumn - Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="">
    <main id="sign-in-up" class="sign-in-container-styles sign-in-background">
        <?php include('includes/sign-in-up.php'); ?>
    </main>

    <?php include('includes/header.php'); ?>
    <!-- <?php include('includes/sign-up-sign-in.php'); ?> -->

    <main id="sidebar-yourWorkspaces" class="">
        <?php include('includes/sidebar.php'); ?>
        <?php include('includes/your-workspaces.php'); ?>
    </main>
    
    <main id="background-project-screen" class="background-styles-project">
        <?php include('includes/aside.php'); ?>
        <?php include('includes/project-screen.php'); ?>
        <?php include('includes/teams-list.php'); ?>
        <?php include('includes/create-team.php'); ?>
    </main>
    
    <?php include('includes/create-workspace.php'); ?>

    <section class="shadow inactive"></section>
    <!-- ?php include('includes/footer.php'); ?> -->
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>

    <script>
        let commentsText = new Quill('#editor-container-task-1', {
            theme: 'snow'
        });
    </script>

    <script src="js/main.js"></script>
</body>
</html>
