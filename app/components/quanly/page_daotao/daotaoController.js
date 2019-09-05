adminApp.controller('daotaoController', ['$scope', '$rootScope','$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = "Đào tạo";

  function fetchAllStudents() {
    $scope.hocvien = $resource('http://localhost:8080/hocvien').query(function(data) {
      return data;
    });
  };
  fetchAllStudents();

  function fetchAllStudentsType() {
    $scope.loaihocvien = $resource('http://localhost:8080/danhmuchocvien').query(function(data) {
      return data;
    });
  };
  fetchAllStudentsType();

  function fetchAllSchool() {
    $scope.truonghoc = $resource('http://localhost:8080/truonghoc').query(function(data) {
      return data;
    });
  };
  fetchAllSchool();

  function fetchAllAccounttype() {
    $scope.loaitaikhoan = $resource('http://localhost:8080/loaitaikhoan').query(function(data) {
      return data;
    });
  };
  fetchAllAccounttype();

  function fetchAllMajor() {
    $scope.chuyennganh = $resource('http://localhost:8080/chuyennganh').query(function(data) {
      return data;
    });
  };
  fetchAllMajor();

  function fetchAllCourse() {
    $scope.khoahoc = $resource('http://localhost:8080/khoahoc').query(function(data) {
      return data;
    });
  };
  fetchAllCourse();

  function fetchAllSubjects() {
    $scope.monhoc = $resource('http://localhost:8080/monhoc').query(function(data) {
      return data;
    });
  };
  fetchAllSubjects();

  function fetchAllEducate() {
    $scope.daotao = $resource('http://localhost:8080/daotao').query(function(data) {
      return data;
    });
  };
  fetchAllEducate();

  $scope.refresh = function() {
    fetchAllStudents();
  };



  $scope.seletedLoaitaikhoan="";
  $scope.statusAccounttype="";
  $scope.selectLoaiTaiKhoan = function(SelectLoaiTaiKhoan)
  {
     $scope.seletedLoaitaikhoan = SelectLoaiTaiKhoan;
     for (var i = 0; i < $scope.loaitaikhoan.length; i++) {
       if($scope.seletedLoaitaikhoan==$scope.loaitaikhoan[i].id)
      {
        $scope.resultLoaitk=$scope.loaitaikhoan[i];
        return $scope.resultLoaitk;
        $scope.statusAccounttype=1;
      }
      else {

      }
     }
     if($scope.statusAccounttype==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }


  $scope.seletedKhoahoc="";
  $scope.statusCourse="";
  $scope.selectKhoaHoc = function(SelectKhoaHoc)
  {
     $scope.seletedKhoahoc = SelectKhoaHoc;
     for (var i = 0; i < $scope.loaitaikhoan.length; i++) {
       if($scope.seletedKhoahoc==$scope.khoahoc[i].makhoahoc)
      {
        $scope.resultKhoaHoc=$scope.khoahoc[i];
        return $scope.resultKhoaHoc;
        $scope.statusCourse=1;
      }
      else {

      }
     }
     if($scope.statusCourse==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }



  $scope.seletedLoaiHocVien="";
  $scope.statusStudentType="";
  $scope.selectLoaiHocVien = function(SelectLoaiHocVien)
  {
     $scope.seletedLoaiHocVien = SelectLoaiHocVien;
     for (var i = 0; i < $scope.loaihocvien.length; i++) {
       if($scope.seletedLoaiHocVien==$scope.loaihocvien[i].id)
      {
        $scope.resultLoaiHocVien=$scope.loaihocvien[i];
        return $scope.resultLoaiHocVien;
        $scope.statusStudentType=1;
      }
      else {

      }
     }
     if($scope.statusStudentType==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }


  $scope.seletedChuyenNganh="";
  $scope.statusChuyenNganh="";
  $scope.selectChuyenNganh = function(SelectChuyenNganh)
  {
     $scope.seletedChuyenNganh = SelectChuyenNganh;
     for (var i = 0; i < $scope.chuyennganh.length; i++) {
       if($scope.seletedChuyenNganh==$scope.chuyennganh[i].id)
      {
        $scope.resultChuyenNganh=$scope.chuyennganh[i];
        return $scope.resultChuyenNganh;
        $scope.statusChuyenNganh=1;
      }
      else {

      }
     }
     if($scope.statusChuyenNganh==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }

  $scope.seletedMonHoc="";
  $scope.statusMonHoc="";
  $scope.selectMonHoc = function(SelectMonHoc)
  {
     $scope.seletedMonHoc = SelectMonHoc;
     for (var i = 0; i < $scope.monhoc.length; i++) {
       if($scope.seletedMonHoc==$scope.monhoc[i].mamh)
      {
        $scope.resultMonHoc=$scope.monhoc[i];
        return $scope.resultMonHoc;
        $scope.statusMonHoc=1;
      }
      else {

      }
     }
     if($scope.statusMonHoc==1)
     {
       alert("Tim thay");
     }
     else {
       alert("Khong tim thay");
     }

  }

  $scope.searchStudent = function() {
    $scope.status="";
    for (var i = 0; i < $scope.hocvien.length; i++) {
      if($scope.Seach.toString()==$scope.hocvien[i].mahv.toString())
      {
        $scope.status=1;
      }
      else {

      }
    }
    if($scope.status==1)
    {
      window.location="#!result";
    }
    else {
      alert("Không tìm thấy học viên!");
    }
  };

  $scope.createDaoTao = function() {
    User = $resource(
      "http://localhost:8080/daotao", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.chuyennganh_ID=$scope.SelectChuyenNganh;
    user.mamh_ID = $scope.resultMonHoc.mamh;
    $scope.Message = User.save(user);

    location.reload();
  };

$scope.setMaDelete= function(IdChuyennganh, IdMonhoc) {
  $scope.TenChuyennganhDelete=IdChuyennganh.tencn;
  $scope.TenMonhocDelete=IdMonhoc.tenmh;
  $scope.MaChuyennganhDelete=IdChuyennganh;
  $scope.MaMonhocDelete=IdMonhoc;
};
  $scope.deleteDaotao = function() {
    User = $resource(
      "http://localhost:8080/daotao/:id/:id2", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id',
            id2: '@id2'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaMonhocDelete.mamh,
      id2: $scope.MaChuyennganhDelete.id
    });
    location.reload();
  };
$scope.refAdd = function(ChuyenNganh) {
  $scope.TenCN=ChuyenNganh.tencn;
  $scope.SelectChuyenNganh=ChuyenNganh.id;
  return $scope.SelectChuyenNganh;
};
$scope.changeAccountType = function() {
  for (var i = 0; i < $scope.hocvien.length; i++) {
    if($scope.Seach.toString()==$scope.hocvien[i].mahv.toString())
    {
      $scope.ResultSearch=$scope.hocvien[i];
      $scope.status=1;
    }
    else {

    }
  }
  if($scope.status==1)
  {
    User = $resource(
      "http://localhost:8080/hocvien/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.truonghoc=$scope.ResultSearch.truonghoc;
    user.khoahoc=$scope.ResultSearch.khoahoc;
    user.loaitaikhoan=$scope.resultLoaitk;
    user.danhmuchocvien=$scope.ResultSearch.danhmuchocvien;
    user.password = $scope.ResultSearch.password;
    user.tgcothedilam= $scope.ResultSearch.tgcothedilam;
    user.email = $scope.ResultSearch.email;
    user.diachi=$scope.ResultSearch.diachi;
    user.sdt = $scope.ResultSearch.sdt;
    user.ho = $scope.ResultSearch.ho;
    user.tenlot = $scope.ResultSearch.tenlot;
    user.gioitinh=$scope.ResultSearch.gioitinh;
    user.ngaysinh=$scope.ResultSearch.ngaysinh;
    user.noisinh=$scope.ResultSearch.noisinh;
    user.cmnd=$scope.ResultSearch.cmnd;
    user.ten = $scope.ResultSearch.ten;
    user.mahv = $scope.Seach.toString();

    $scope.Message = User.save({
      id: $scope.Seach.toString()
    }, user);
    location.reload();
  }
  else {
    alert("Học viên không tồn tại!");
  }
};
$scope.getMaTruong = function(student) {
  $scope.tentruong=student.tentruong;
  $scope.diachi=student.diachi;

  $scope.uMaTruong=student.matruong;
  return $scope.uMaTruong;
}
  $scope.updateSchool = function() {
    //console.log($scope.MaHV);
    User = $resource(
      "http://localhost:8080/truonghoc/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tentruong=$scope.tentruong;
    user.diachi = $scope.diachi;
    user.matruong = $scope.uMaTruong;

    $scope.Message = User.save({
      id: $scope.uMaTruong
    }, user);
    location.reload();
  };



      $scope.pageNo=0;
      $scope.pageSize=5;
      $scope.total=0;
      function getCountHocvien() {
          $http.get("http://localhost:8080/chuyennganh").then(
                         function (response) {
                            $scope.soluonghocvien = response.data.length;
                             $scope.total=response.data.length/$scope.pageSize;
                             getSLHocvien();
                         },
                         function (err) {
                             var error = err;
                         });
      }
      getCountHocvien();

      $scope.changePageSize = function(PageSize) {
        $scope.pageNo = 0;
        $scope.temp2 = 1;
        $scope.arrSLHocvien = [];
        $scope.pageSize = PageSize;
        getCountHocvien();
        getHocvienPage2();
      };
      $scope.SelectChuyenNganh = 1;
      $scope.typeSort = 1;
      $scope.pageSize = '5';
      $scope.sortBy = "TENCN";
      $scope.idChuyennganh = 1;

      $scope.changeCourse = function() {
        $scope.arrSLHocvien = [];
        $scope.pageNo = 0;
        $scope.temp = $scope.pageNo + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        $scope.idChuyennganh = $scope.SelectChuyenNganh;
        getHocvienPage();
      };

      function getHocvienPage() {
          $http.get("http://localhost:8080/chuyennganh2?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize+ "&idChuyennganh=" + $scope.idChuyennganh).then(
                         function (response) {
                           $scope.soluonghienthi = response.data.length;
                             $scope.daotaopage = response.data;
                         },
                         function (err) {
                             var error = err;
                         });
      }
      getHocvienPage();

      function getHocvienPage2() {
          $http.get("http://localhost:8080/chuyennganh3?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
                         function (response) {
                            $scope.soluonghienthi = response.data.length;
                             $scope.daotaopage = response.data;
                         },
                         function (err) {
                             var error = err;
                         });
      }
      getHocvienPage2();

      $scope.getALL = function() {
        getHocvienPage2();
      }
      function getSTT() {
        $scope.temp2 = 1;
      }
      getSTT();

      $scope.numb = function(So) {
        $scope.temp = So + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        $scope.pageNo=So;
        getHocvienPage2();
      };

      $scope.arrSLHocvien = [];
      function getSLHocvien() {
          for (var i = 0; i < $scope.total; i++) {
              $scope.arrSLHocvien[i]=i;

          }
      }
      getSLHocvien();

      $scope.nextCount = function() {
        getCountHocvien();
        //alert($scope.pageNo);
        if($scope.pageNo<$scope.total)
        {
          $scope.pageNo++;
          if($scope.pageNo>=$scope.total)
          {
            $scope.pageNo--;
          }
          else {
            $scope.temp = $scope.pageNo + 1;
            $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
            getHocvienPage2();
          }
        }
        else {
          $scope.pageNo=$scope.total;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage2();
        }
      };

      $scope.preCount = function() {
        getCountHocvien();
        if($scope.pageNo>0)
        {
          $scope.pageNo--;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage2();
          if($scope.pageNo<0)
          {
            $scope.pageNo=0;
          }
        }
        else {
          $scope.pageNo=0;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage2();
        }
      };

}]);
