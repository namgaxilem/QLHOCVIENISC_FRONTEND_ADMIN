adminApp.config(function($routeProvider) {
  $routeProvider
    .when("/chuyennganh", {
      templateUrl: "app/components/quanly/page_chuyennganh/chuyennganhView.html"
    })
    .when("/diemhocvien", {
      templateUrl: "app/components/quanly/page_diemhocvien/diemhocvienView.html"
    })
    .when("/giangvien", {
      templateUrl: "app/components/quanly/page_dangky/dangkyView.html"
    })
    .when("/gopy", {
      templateUrl: "app/components/quanly/page_gopy/gopyView.html"
    })
    .when("/hocvien", {
      templateUrl: "app/components/quanly/page_hocvien/hocvienView.html"
    })
    .when("/khoahoc", {
      templateUrl: "app/components/quanly/page_khoahoc/khoahocView.html"
    })
    .when("/monhoc", {
      templateUrl: "app/components/quanly/page_monhoc/monhocView.html"
    })
    .when("/phonghoc", {
      templateUrl: "app/components/quanly/page_phonghoc/phonghocView.html"
    })
    .when("/taikhoan", {
      templateUrl: "app/components/quanly/page_taikhoan/taikhoanView.html"
    })
    .when("/thoikhoabieu", {
      templateUrl: "app/components/quanly/page_thoikhoabieu/thoikhoabieuView.html"
    })
    .when("/thongbao", {
      templateUrl: "app/components/quanly/page_thongbao/thongbaoView.html"
    })
    .when("/doanhnghiep", {
      templateUrl: "app/components/quanly/page_doanhnghiep/doanhnghiepView.html"
    })
    .when("/trangchu", {
      templateUrl: "app/components/quanly/page_trangchu/trangchuView.html"
    })
    .when("/truonglienket", {
      templateUrl: "app/components/quanly/page_truonglienket/truonglienketView.html",
      controller: "truonglienketController"
    })
    //otherwise
    .otherwise({
      template: "<div class='container'><hr><h3>Không tìm thấy trang này</h3><hr></div></br>"
    });
});
