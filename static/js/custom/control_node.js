function ubahFooter(perintah,status) {
  if (status==1) {
      $("#status").html("Executed");
    }
    else{
      $("#status").html("Waiting");
    }
  switch (perintah) {
    case 0:
      $("#perintah").html("Default (Otomatis)");
      break;
    case 1:
      $("#perintah").html("Scheduled");
      break;
    case 2:
      $("#perintah").html("Stay On");
      break;
    case 3:
      $("#perintah").html("Stay Off");
      break;
    default:
      break;
  }
}
function ubahPerintah(perintah) {
  switch (perintah) {
    case 0:
      document.getElementById("customRadio1").checked = true;
      break;
    case 1:
        document.getElementById("customRadio2").checked = true;
        break;
    case 2:
        document.getElementById("customRadio3").checked = true;
        break;
    case 3:
      document.getElementById("customRadio4").checked = true;
      break;
    default:
      break;
  }
}
function myFunction(b) {
  $.post(api_control_url,
    {
      perintah: b,
      status:"0",
      nama:""
    }
  );
  // $.get(sync_control_get+"?nilai="+b,
  //   {
  //     // nilai:b
  //   }
  // );
  try {
    $.get(sync_control_get,
    {
      nilai:b
    }
    ).fail(function() {
      post_failure();
      console.log("post failure");
    });
  } catch (error) {
    print("Error :"+error);
  }
}
function post_failure(){
  $.post(api_queue_url,
    {
      id_arduino:id_arduino,
      id_user:id_user,
      perintah:perintah 
    }
  );
}
function cekStatus() {
  $.get(api_control_url, function (data) {
    setTimeout(cekStatus,1000);
    // let isi = data['status'];
    // console.log(isi);
    ubahFooter(data['perintah'],data['status']);
  });  
}
ubahPerintah(perintah);
$("#customRadio1").change(function() {myFunction(0)});
$("#customRadio2").change(function() {myFunction(1)});
$("#customRadio3").change(function() {myFunction(2)});
$("#customRadio4").change(function() {myFunction(3)});
cekStatus();
    
    
