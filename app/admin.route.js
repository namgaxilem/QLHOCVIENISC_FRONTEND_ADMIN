adminApp.config(['$stateProvider', '$urlRouterProvider',
  function( $stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('common', {
        templateUrl: 'app/components/quanly/quanly.html',
        abstract: true,
        controller: 'dangnhapController'
      })
      .state('hocvien', {
        url: '/hocvien',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_hocvien/hocvienView.html',
        controller: 'hocvienController'
      })
      .state('khoahoc', {
        url: '/khoahoc',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_khoahoc/khoahocView.html',
        controller: 'khoahocController'
      })
      .state('truonghoc', {
        url: '/truonghoc',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_truonghoc/truonghocView.html',
        controller: 'truonghocController'
      })
      .state('monhoc', {
        url: '/monhoc',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_monhoc/monhocView.html',
        controller: 'monhocController'
      })
      .state('daotao', {
        url: '/daotao',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_daotao/daotaoView.html',
        controller: 'daotaoController'
      })
      .state('chuyennganh', {
        url: '/chuyennganh',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_chuyennganh/chuyennganhView.html',
        controller: 'chuyennganhController'
      })
      .state('thoikhoabieu', {
        url: '/thoikhoabieu',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_thoikhoabieu/thoikhoabieuView.html',
        controller: 'thoikhoabieuController'
      })
      .state('thongbao', {
        url: '/thongbao',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_thongbao/thongbaoView.html',
        controller: 'thongbaoController'
      })
      .state('diemhocvien', {
        url: '/diemhocvien',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_diemhocvien/diemhocvienView.html',
        controller: 'diemhocvienController'
      })
      .state('giangvien', {
        url: '/giangvien',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_giangvien/giangvienView.html',
        controller: 'giangvienController'
      })
      .state('gopy', {
        url: '/gopy',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_gopy/gopyView.html',
        controller: 'gopyController'
      })
      .state('nguoiquanly', {
        url: '/nguoiquanly',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_nguoiquanly/nguoiquanlyView.html',
        controller: 'nguoiquanlyController'
      })
      .state('phonghoc', {
        url: '/phonghoc',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_phonghoc/phonghocView.html',
        controller: 'phonghocController'
      })
      .state('doanhnghiep', {
        url: '/doanhnghiep',
        parent: 'common',
        templateUrl: 'app/components/quanly/page_doanhnghiep/doanhnghiepView.html',
        controller: 'doanhnghiepController'
      })
      //đăng nhập
      .state('dangnhap', {
        url: '/dangnhap',
        templateUrl: 'app/components/dangnhap/page_dangnhap/dangnhapView.html',
        controller: 'dangnhapController'
      });

    $urlRouterProvider.otherwise('/dangnhap');
  }
]);
