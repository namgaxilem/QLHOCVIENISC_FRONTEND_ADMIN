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
      templateUrl: "/page_khoahoc/khoahocView.html"
    })
    .when("/monhoc", {
      templateUrl: "/page_monhoc/monhocView.html"
    })
    .when("/phonghoc", {
      templateUrl: "/page_phonghoc/phonghocView.html"
    })
    .when("/taikhoan", {
      templateUrl: "page_taikhoan/taikhoanView.html"
    })
    .when("/thoikhoabieu", {
      templateUrl: "/page_thoikhoabieu/thoikhoabieuView.html"
    })
    .when("/thongbao", {
      templateUrl: "/page_thongbao/thongbaoView.html"
    })
    .when("/tinhnang", {
      templateUrl: "/page_tinhnang/tinhnangView.html"
    })
    .when("/trangchu", {
      templateUrl: "/page_trangchu/trangchuView.html"
    })
    .when("/truonglienket", {
      templateUrl: "/page_truonglienket/truonglienketView.html"
    })
    //otherwise
    .otherwise({
      template: "<div class='container'><hr><h3>Không tìm thấy trang này</h3><hr></div></br>"
    });
});
