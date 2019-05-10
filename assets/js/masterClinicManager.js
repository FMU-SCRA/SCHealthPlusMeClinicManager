'use strict';

$(document).ready(function(){


});

// connection to the Firebase Database
firebase.initializeApp({
apiKey: "AIzaSyCSz2T3eruA7DdHh9NjXsiBW4Bma0q1Khk",
authDomain: "health-companion-e4173.firebaseapp.com",
projectId: "health-companion-e4173"
});

  var db = firebase.firestore();


const clinicListButtons = document.querySelector('#clinic-button');
// const clinicList = document.querySelector('#clinic-list');
// const contentDiv = document.querySelector('#content');

var removeClinicBody = '<div class="form-group"><input id="clinicInput" type="text" class="form-control" name="clientIDBox" placeholder="ID" value=""></div>';

function renderClinic(doc) {
  let button = document.createElement('button');

  let content = document.createElement('div');


  content.setAttribute('class', "content")

  let li = document.createElement('li');

  let clinicID = document.createElement('span');

  let clinicName = document.createElement('span');

  let addressTitle = document.createElement('span');

  let address = document.createElement('span');

  let city = document.createElement('span');

  let state = document.createElement('span');

  let zip = document.createElement('span');

  let phoneTitle = document.createElement('span');

  let phone = document.createElement('span');

  let hoursNormalTitle = document.createElement('span');
  let hoursNormal = document.createElement('span');

  let hoursSatTitle = document.createElement('span');
  let hoursSat = document.createElement('span');

  let hoursSunTitle = document.createElement('span');
  let hoursSun = document.createElement('span');

  let websiteTitle = document.createElement('span');
  let website = document.createElement('span');
  // let location = document.createElement('span');

  // services
  let services = document.createElement('span');
  let bloodPressureBool = document.createElement('span');
  let bloodSugarBool = document.createElement('span');
  let cholesterolBool = document.createElement('span');
  let fluShotBool = document.createElement('span');
  let pneumoniaBool = document.createElement('span');
  let shinglesBool = document.createElement('span');

  li.setAttribute('data-id', doc.id);

  button.setAttribute('class', "collapsible")

  clinicID.textContent = doc.id;

  clinicName.textContent = doc.data().clinicName;

  addressTitle.textContent = "Address:";

  address.textContent = doc.data().address;

  city.textContent = doc.data().city;

  state.textContent = doc.data().state;

  zip.textContent = doc.data().zip;

  phoneTitle.textContent = "Phone:"

  phone.textContent = doc.data().phone;

  hoursNormalTitle.textContent = "Normal Hours:";
  hoursNormal.textContent = doc.data().hoursNormal;

  hoursSatTitle.textContent = "Saturday Hours:"
  hoursSat.textContent = doc.data().hoursSat;

  hoursSunTitle.textContent = "Sunday Hours:"
  hoursSun.textContent = doc.data().hoursSun;
  // website title and value
  websiteTitle.textContent = "Website:";
  website.textContent = doc.data().website;
  // location.textContent = doc.data().location;


  bloodPressureBool.textContent = doc.data().serviceBloodPressure;
  bloodSugarBool.textContent = doc.data().serviceBloodSugar;
  cholesterolBool.textContent = doc.data().serviceCholesterol;
  fluShotBool.textContent = doc.data().serviceFlu;
  pneumoniaBool.textContent = doc.data().servicePneumonia;
  shinglesBool.textContent = doc.data().serviceShingles;

  // console.log("BP:"+ bloodPressureBool.textContent);
  // console.log("BS:"+ bloodSugarBool.textContent);
  // console.log("C:"+ cholesterolBool.textContent);
  // console.log("FS:"+ fluShotBool.textContent);
  // console.log("P:"+ pneumoniaBool.textContent);
  // console.log("S:"+ shinglesBool.textContent);

  button.appendChild(clinicName);
  button.appendChild(addressTitle);
  button.appendChild(address);
  button.appendChild(city);
  button.appendChild(state);
  button.appendChild(zip);
  content.appendChild(clinicID);
  content.appendChild(phoneTitle);
  content.appendChild(phone);
  content.appendChild(hoursNormalTitle);
  content.appendChild(hoursNormal);
  content.appendChild(hoursSatTitle);
  content.appendChild(hoursSat);
  content.appendChild(hoursSunTitle);
  content.appendChild(hoursSun);
  // website title and value
  content.appendChild(websiteTitle);
  content.appendChild(website);
  // content.appendChild(location);

  services.textContent = "Services: "

  content.appendChild(services);

if (bloodPressureBool.textContent == 'true') {
  bloodPressureBool.textContent = "Blood Pressure";
  content.appendChild(bloodPressureBool);
  // console.log("BP:"+ bloodPressureBool.textContent);
}

if (bloodSugarBool.textContent == "true") {
  bloodSugarBool.textContent = "Blood Sugar";
  content.appendChild(bloodSugarBool);
  // console.log("BS:"+ bloodSugarBool.textContent);
}

if (cholesterolBool.textContent == "true") {
  cholesterolBool.textContent = "Cholesterol";
  content.appendChild(cholesterolBool);
  // console.log("C:"+cholesterolBool.textContent);
}

if (fluShotBool.textContent == "true") {
  fluShotBool.textContent = "Flu Shot";
  content.appendChild(fluShotBool);
  // console.log("FS:"+fluShotBool.textContent);

}

if (pneumoniaBool.textContent == "true") {
  pneumoniaBool.textContent = "Pneumonia";
  content.appendChild(pneumoniaBool);
  // console.log("P:"+pneumoniaBool.textContent);
}

if (shinglesBool.textContent == "true") {
  shinglesBool.textContent = "Shingles";
  content.appendChild(shinglesBool);
  // console.log("S:"+shinglesBool.textContent);
}


  clinicListButtons.appendChild(button);

  // clinicList.appendChild(li);

// this appends one element to another perfectly.
  // button.appendChild(content);

  clinicListButtons.appendChild(content);


  // adds the func() to each button on render function call.
  button.addEventListener("click", function() {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show")
    var content = this.nextElementSibling;

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// getting data
db.collection('Locations').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderClinic(doc);

    });
});

function getInputVal(id) {
  return document.getElementById(id).value;
}

function createModal(ID, title, forceStay, modalBody, cancel, submitBtn) {
    // create the modal html in string representation
    var modal = '<div class="modal fade" id="' + ID + '" tabindex="-1" role="dialog" aria-labelledby="Clinic ID" aria-hidden="false" data-keyboard="false">';
    if (forceStay) {
      modal = '<div class="modal fade" id="' + ID + '" tabindex="-1" role="dialog" aria-labelledby="Clinic ID" aria-hidden="false" data-backdrop="static" data-keyboard="false" >';
    }
    modal += '<div class="modal-dialog modal-dialog-centered" role="document">';
    modal += '<div class="modal-content">';
    modal += '<div class="modal-header">';
    modal += '<h5 class="modal-title">' + title + '</h5>';
    modal += '</div>';
    modal += '<div class="modal-body">';
    modal += modalBody;
    modal += '</div>';
    modal += '<div class="modal-footer">';
    // add the cancel button if it is wanted
    if (cancel) {
      modal += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
    }
    modal += submitBtn;
    modal += '</div></div></div></div>';
    // makes the modal appear by converting the strings above into HTML
    document.body.insertAdjacentHTML('beforeend', modal);
    // handles if there are any page size changes
    $('#' + ID).modal('handleUpdate');
  }


  function openRemoveModal() {

    var removeClinicModalBtn = '<button type="button" id="removeClinicButtonFinal" class="btn btn-danger" data-dismiss="modal">Remove</button>';
    var removeClinicBody = '<div class="form-group"><input id="clinicInput" type="text" class="form-control" name="clientIDBox" placeholder="Clinic ID" value=""></div>';
    createModal('removeModal', 'Remove Clinic', true,
      "Please Enter Your Clinic ID:" + removeClinicBody, true, removeClinicModalBtn); // create reset modal for future use
    // makes the modal open
    $('#removeModal').modal({
      keyboard: false,
      backdrop: 'static'
    });

    document.getElementById('clinicInput').value = "";

    // this function deletes the individual clinic by hash
      function deleteClinic() {

        var clinicID = getInputVal('clinicInput');
        var docRef = db.collection("Locations").doc(clinicID);

        docRef.get().then(function(doc) {
          if (doc.exists) {
            db.collection("Locations").doc(clinicID).delete().then(function() {
                console.log("Document successfully deleted!");
                successAlert(clinicID);
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            errorAlert("No Such Document");
          }

        }).catch(function(error) {
          console.log("Error getting document:", error);
          errorAlert("Please Enter A Clinic ID.")
        });

      } // end of deleteClinic method

    var removeBtnModal = document.getElementById('removeClinicButtonFinal');
    removeBtnModal.addEventListener('click', deleteClinic);


  }
    // this opens the Remove Clinic Modal
    document.getElementById("removeClinicMain").addEventListener('click', openRemoveModal);
    document.getElementById("removeClinicSidebar").addEventListener('click', openRemoveModal);

    function successAlert(message) {
        var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top: 50px;">' +
          '<strong>Deleted Clinic ID: </strong> ' + message +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span> </button></div>',
          already = $('.alert');
        if (already.length > 0) {
          already.remove();
        }
          document.body.insertAdjacentHTML('afterbegin', alert);
        $('alert').alert();
      }

      function errorAlert(message) {
          var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert" style="margin-top: 50px;">' +
            '<strong>No Matching Key</strong> ' + message +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span> </button></div>',
            already = $('.alert');
          if (already.length > 0) {
            already.remove();
          }
            document.body.insertAdjacentHTML('afterbegin', alert);
          $('alert').alert();
        }
