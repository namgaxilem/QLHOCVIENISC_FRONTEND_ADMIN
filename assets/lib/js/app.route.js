rootApp.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl: "/pages/home.html",
          controller: "homeController"
      })
      .when("/dangnhap", {
          templateUrl: "/login.html",
          controller: "loginController"
      })
    .when("/dangky", {
        templateUrl: "/register.html",
        controller: "registerController"
    })
       .when("/quenmatkhau", {
           templateUrl: "/forget-pass.html",
           controller: "forgetpassController"
       })
      .when("/qlhocvien", {
          templateUrl: "/pages/hocvien.html",
          controller: "qlhocvienController"
      })
      .when("/qlgiangvien", {
          templateUrl: "/pages/giangvien.html",
          controller: "qlgiangvienController"
      })
    .when("/qlkhoahoc", {
        templateUrl: "/pages/khoahoc.html",
        controller: "qlkhoahocController"
    })
        .when("/qlchuyennganh", {
            templateUrl: "/pages/chuyennganh.html",
            controller: "qlchuyennganhController"
        })
        .when("/qlmonhoc", {
            templateUrl: "/pages/monhoc.html",
            controller: "qlmonhocController"
        })
        .when("/qlthoikhoabieu", {
            templateUrl: "/pages/thoikhoabieu.html",
            controller: "qlthoikhoabieuController"
        })
        .when("/qltinhnang", {
            templateUrl: "/pages/tinhnang.html",
            controller: "qltinhnangController"
        })
        .when("/qlthongbao", {
            templateUrl: "/pages/thongbao.html",
            controller: "qlthongbaoController"
        })
        .when("/qlgopy", {
            templateUrl: "/pages/gopy.html",
            controller: "qlgopyController"
        })
        .when("/qlphonghoc", {
            templateUrl: "/pages/phonghoc.html",
            controller: "qlphonghocController"
        })
        .when("/qldiemhocvien", {
            templateUrl: "/pages/diemhocvien.html",
            controller: "qldiemhocvienController"
        })
        .when("/qltruonglienket", {
            templateUrl: "/pages/truonglienket.html",
            controller: "qltruonglienketController"
        })
        .when("/qltaikhoan", {
            templateUrl: "/pages/taikhoan.html",
            controller: "qltaikhoanController"
        })
      .otherwise({
          template: "<div class='container'><hr><h3>Không tìm thấy trang này</pages/h3><hr></pages/div></pages/br>"
      });
});