adminApp.controller('chuyennganhController', ['$scope', '$rootScope', '$http', '$resource', function($scope, $rootScope, $http, $resource) {
  $rootScope.title = 'Chuyên ngành';

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

  $scope.createChuyennganh = function() {
    User = $resource(
      "http://localhost:8080/chuyennganh", {}, {
        save: {
          method: 'POST',
          isArray: false
        }
      }
    );

    var user = {};
    user.tencn=$scope.tenchuyennganh;
    $scope.Message = User.save(user);

    location.reload();
  };

$scope.setMaDelete= function(IdChuyennganh) {
  $scope.MaChuyennganhDelete=IdChuyennganh;
};
  $scope.deleteChuyennganh = function() {
    User = $resource(
      "http://localhost:8080/chuyennganh/:id", {}, {
        save: {
          method: 'DELETE',
          params: {
            id: '@id'
          }
        }
      }
    );

    $scope.Message = User.delete({
      id: $scope.MaChuyennganhDelete
    });
    location.reload();
  };
$scope.refAdd = function() {
  $scope.tenchuyennganh="";
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
$scope.getMaChuyennganh = function(student) {
  $scope.machuyennganh=student.id;
  $scope.tenchuyennganh=student.tencn;

  $scope.uMaChuyennganh=student.id;
  return $scope.uMaChuyennganh;
}
  $scope.updateChuyennganh = function() {
    //console.log($scope.MaHV);
    User = $resource(
      "http://localhost:8080/chuyennganh/:id", {}, {
        save: {
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }
    );

    var user = {};

    user.tencn=$scope.tenchuyennganh;
    user.id = $scope.uMaChuyennganh;

    $scope.Message = User.save({
      id: $scope.uMaChuyennganh
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

      $scope.pageSize = '5';
      $scope.changePageSize = function(PageSize) {
        $scope.pageNo = 0;
        $scope.temp2 = 1;
        $scope.arrSLHocvien = [];
        $scope.pageSize = PageSize;
        getCountHocvien();
        getHocvienPage();
      };
      function getSTT() {
        $scope.temp2 = 1;
      }
      getSTT();

      function getHocvienPage() {
          $http.get("http://localhost:8080/chuyennganh3?pageNo=" + $scope.pageNo + "&pageSize=" + $scope.pageSize).then(
                         function (response) {
                           $scope.soluonghienthi = response.data.length;
                             $scope.chuyennganhpage = response.data;
                         },
                         function (err) {
                             var error = err;
                         });
      }
      getHocvienPage();

      $scope.numb = function(So) {
        $scope.temp = So + 1;
        $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
        $scope.pageNo=So;
        getHocvienPage();
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
            getHocvienPage();
          }
        }
        else {
          $scope.pageNo=$scope.total;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage();
        }
      };

      $scope.preCount = function() {
        getCountHocvien();
        if($scope.pageNo>0)
        {
          $scope.pageNo--;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage();
          if($scope.pageNo<0)
          {
            $scope.pageNo=0;
          }
        }
        else {
          $scope.pageNo=0;
          $scope.temp = $scope.pageNo + 1;
          $scope.temp2 = ($scope.temp * $scope.pageSize) - ($scope.pageSize - 1);
          getHocvienPage();
        }
      };

}]);
