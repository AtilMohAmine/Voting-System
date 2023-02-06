<!DOCTYPE html>
<html lang="ar">
<head>
    <script src="https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.14.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.14.0/firebase-database-compat.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/styles.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الصفحة الرئيسية</title>
</head>
<body>
    <div class="modal">
        <div class="modalContent">
            <p>هل تريد حقا الإرسال؟</p>
            <button class="yes">نعم</button>
            <button class="no">لا</button>
        </div>
    </div>
    <div class="header">
        <button id="sign-in-button" class="header-button">تسجيل دخول <i class="fa fa-sign-in"></i></button>
        <button id="sign-out-button" class="header-button">تسجيل خروج <i class="fa fa-times"></i></button>
        <label id="sign-in-status"></label>
    </div>
    <div class="alert info" id="hideMe">
		يجب عليك تسجيل الدخول أولا    
    </div>
    <div class="main"></div> 
    <div class="submit-button-container">
        <button class="submit-button">إرسال</button>
    </div>
    <div class="loader"></div>
             
    <script src="./js/init.js"></script>
    <script src="./js/index.js"></script>
</body>
</html>