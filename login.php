<!DOCTYPE html>
<html lang="ar">
<head>
    <script src="https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.14.0/firebase-auth-compat.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/styles.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل دخول</title>
</head>
<body>
    <div class="login-container"> 
        <div class="title">سجل الدخول للتصويت</div>
        <button id="login-with-google" class="login-button">دخول بإستخدام حساب جوجل <i class="fa fa-google"></i></button>
        <button id="login-with-facebook" class="login-button">دخول بإستخدام حساب فايسبوك <i class="fa fa-facebook"></i></button>
        <button id="login-with-twitter" class="login-button">دخول بإستخدام حساب تويتر <i class="fa fa-twitter"></i></button>
        <label id="login-error"></label>
    </div>
<?php
?>
    <script src="./js/init.js"></script>
    <script src="./js/login.js"></script>
</body>
</html>
