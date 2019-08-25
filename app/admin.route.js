adminApp.config(function($routeProvider) {
  $routeProvider
    .when("/hocvien", {
      templateUrl: "app/components/quanly/page_hocvien/hocvienView.html"
    })
    .when("/hoso", {
      templateUrl: "app/components/quanly/page_diemhocvien/diemhocvienView.html"
    })
    .when("/monhoc", {
      templateUrl: "app/components/quanly/page_monhoc/monhocView.html"
    })
    .when("/daotao", {
      templateUrl: "app/components/quanly/page_dangky/dangkyView.html"
    })
    .when("/truonglienket", {
      templateUrl: "app/components/quanly/page_truonglienket/truonglienketView.html"
    })
    .when("/khoahoc", {
      templateUrl: "app/components/quanly/page_khoahoc/khoahocView.html"
    })
    .when("/doanhnghiep", {
      templateUrl: "app/components/quanly/page_doanhnghiep/doanhnghiepView.html"
    })
    .when("/chuyennganh", {
      templateUrl: "app/components/quanly/page_chuyennganh/chuyennganhView.html"
    })
    //otherwise
    .otherwise({
      template: "<div class='container'><hr><h3>Không tìm thấy trang này</h3><hr></div></br>"
    });
});
