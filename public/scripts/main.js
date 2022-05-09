const controller = {
  toggleElem: function () {
    $(".indexContainer").toggleClass("d-none");
    $(".listInputsContainer").toggleClass("d-none");
    $(".output").html("");
  },

  controllerIndex: function () {
    $(".backButton").click(function () {
      controller.toggleElem();
    });
    $(".indexSubmit").click(function () {
      $loops = $(".numberOfPersons").val();
      if ($loops < 1) {
        alert("Number of peoples must be great 1");
      } else {
        controller.toggleElem();
        $listOfinput = $(".listInputs").html(
          '<ul class="list-unstyled inptuLi"></ul>'
        );
        for (let $i = 0; $i < $loops; $i++) {
          $(".inptuLi").append(
            '<li><input type="text" class="person form-control my-2" data-id="' +
              $i +
              '" placeholder="First Name yyyy-mm-dd" ></li>'
          );
        }
      }
    });
  },
  dataControler: function () {
    $(".generateButton").click(function () {
      $dataInput = [];
      $continue = true;
      $(".person").each(function (elem) {
        $validate = controller.validator($(this).val());
        if ($validate == "success") {
          $dataInput.push(
            $(this).val().split(" ")[0] +
              " " +
              $(this).val().split(" ")[1] +
              " " +
              $(this).val().split(" ")[2]
          );
        } else {
          controller.response($validate, $(this));
          $continue = false;
          $(".output").html("");
        }
      });
      if ($continue) {
        controller.delErrorElem($(this));
        $familes = [];
        $allSorted = [];
        $p = "";
        for ($i in $dataInput) {
          if (!$familes.includes($dataInput[$i].split(" ")[1])) {
            $familes.push($dataInput[$i].split(" ")[1]);
          }
        }

        for ($j in $familes) {
          $famSorted = [];
          for ($k in $dataInput) {
            if ($familes[$j] == $dataInput[$k].split(" ")[1]) {
              $famSorted.push($dataInput[$k]);
              $famSorted.sort(function (a, b) {
                a = a.split(" ")[2];
                b = b.split(" ")[2];
                return new Date(a) - new Date(b);
              });
            }
          }
          $allSorted.push($famSorted);
        }

        $allSorted.sort(function (a, b) {
          a = a.length;
          b = b.length;
          return b - a;
        });
        for ($l in $allSorted) {
          $p += $allSorted[$l][0].split(" ")[1] + ": ";
          for ($m in $allSorted[$l]) {
            $p += $allSorted[$l][$m].split(" ")[0] + " ";
          }
          $p += "%";
        }
        $(".output").html("<p>Output:</p>");
        for ($i in $p.split("%")) {
          if ($i != $p.length - 1) {
            $(".output").append("<p>" + $p.split("%")[$i] + "</p>");
          }
        }
      }
    });
  },
  delErrorElem:function ($elem) {
    $elem.parent().find(".errorMsg").remove(); 
  },
  response: function ($msg, $elem) {
    controller.delErrorElem($elem);
    $elem.parent().append("<span class='text-danger errorMsg'>"+$msg+"<span>");
 
  },
  validator: function ($row) {
    if ($row.split(" ")[0] && $row.split(" ")[1] && $row.split(" ")[2]) {
      var dateReg = /^\d{4}-\d{2}-\d{2}$/;
      if ($row.split(" ")[2].match(dateReg)) {
        $result = "success";
      } else {
        $result = "D-day format: yyyy/mm/dd";
      }
    } else {
      $result = "Bad input";
    }

    return $result;
  },
};
$(function () {
  controller.controllerIndex();
  controller.dataControler();
});
