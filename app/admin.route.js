adminApp.config(function($routeProvider) {
  $routeProvider
    .when("/hocvien", {
      templateUrl: "app/components/quanly/page_hocvien/hocvienView.html",
      controller: "hocvienController"
    })
    .when("/khoahoc", {
      templateUrl: "app/components/quanly/page_khoahoc/khoahocView.html",
      controller: "khoahocController"
    })
    .when("/truonghoc", {
      templateUrl: "app/components/quanly/page_truonghoc/truonghocView.html",
      controller: "truonghocController"
    })
    .when("/monhoc", {
      templateUrl: "app/components/quanly/page_monhoc/monhocView.html",
      controller: "monhocController"
    })
    .when("/daotao", {
      templateUrl: "app/components/quanly/page_daotao/daotaoView.html",
      controller: "daotaoController"
    })
    .when("/chuyennganh", {
      templateUrl: "app/components/quanly/page_chuyennganh/chuyennganhView.html",
      controller: "chuyennganhController"
    })
    //Phước
    .when("/giangvien", {
      templateUrl: "app/components/quanly/page_giangvien/giangvienView.html",
      controller: "giangvienController"
    })
    .when("/tinhnang", {
      templateUrl: "app/components/quanly/page_tinhnang/tinhnangView.html",
      controller: "tinhnangController"
    })
    .when("/gopy", {
      templateUrl: "app/components/quanly/page_gopy/gopyView.html",
      controller: "gopyController"
    })
    //Nam
    .when("/diemhocvien", {
      templateUrl: "app/components/quanly/page_diemhocvien/diemhocvienView.html",
      controller: "diemhocvienController"
    })
    .when("/thoikhoabieu", {
      templateUrl: "app/components/quanly/page_thoikhoabieu/thoikhoabieuView.html",
      controller: "thoikhoabieuController"
    })
    .when("/thongbao", {
      templateUrl: "app/components/quanly/page_thongbao/thongbaoView.html",
      controller: "thongbaoController"
    })
    //Thịnh
    .when("/phonghoc", {
      templateUrl: "app/components/quanly/page_phonghoc/phonghocView.html",
      controller: "phonghocController"
    })
    .when("/doanhnghiep", {
      templateUrl: "app/components/quanly/page_doanhnghiep/doanhnghiepView.html",
      controller: "doanhnghiepController"
    })
    .when("/nguoiquanly", {
      templateUrl: "app/components/quanly/page_nguoiquanly/nguoiquanlyView.html",
      controller: "nguoiquanlyController"
    })
    //otherwise
    .otherwise({
      template: "<div class='container'><hr><h3>Không tìm thấy trang này</h3><hr></div></br>"
    });
});
