<?php include('config/config.php'); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autumn - Inicio</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <?php include('includes/header.php'); ?>

    <main id="sidebar-yourWorkspaces" class="">
        <?php include('includes/sidebar.php'); ?>
        <?php include('includes/your-workspaces.php'); ?>
    </main>
    
    <?php include('includes/aside.php'); ?>
    <?php include('includes/create-workspace.php'); ?>
    <?php include('includes/create-team.php'); ?>
    <main>

    </main>
    <section class="shadow inactive"></section>
    <!-- ?php include('includes/footer.php'); ?> -->
    <script src="js/main.js"></script>
</body>
</html>
