

  var firebaseConfig = {
    apiKey: "AIzaSyBgDYuXZcuZDlnDFVCnc0oV51moj-PnSqQ",
    authDomain: "trainscheduler-2e671.firebaseapp.com",
    databaseURL: "https://trainscheduler-2e671.firebaseio.com",
    projectId: "trainscheduler-2e671",
    storageBucket: "",
    messagingSenderId: "271644823821",
    appId: "1:271644823821:web:1a37075c174b52c4"
  };
  
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);


var trainData = firebase.database ();

$("#addTrainBtn").on("click", function (){
    var trainName = $("trainNameInput").val().trim();
    var destination = $("destinationInput").val().trim();
    var firstTrain = moment($("trainTimeInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination, 
        firstTrain: firstTrain,
        frequency: frequency

    

    }

    trainData.ref().push(newTrain);

    $("trainNameInput").val("");
    $("destinationInput").val("");
    $("firstTrainInput").val("");
    $("frequency".val(""));

    return(false);

   
})




trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency-remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");
    
    $("#trainbody > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})