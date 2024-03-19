var express = require('express');
var router = express.Router();
var userModel = require("../modes/usersModel");
var noteModel = require("../modes/NoteModel");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Unique filename
  }
});
const upload = multer({ storage: storage });



router.post("/signUp", async (req, res) => {

  let emailCondition = await userModel.find({ email: req.body.email });

  if (emailCondition.length != 0) {
    return res.json({
      fale: 1,
      msg: "Email Is Aleardy Exist !"
    })
  }
  else {

    let users = await userModel.find({});
    let id;

    if (users.length > 0) {
      let last_user_arr = users.slice(-1);
      let last_user = last_user_arr[0];
      id = last_user.id + 1
    }
    else {
      id = 1
    }

    let user = await userModel.create({
      id: id,
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    return res.json(user)
  }
})


router.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email, password: req.body.password });
  if (user) {
    return res.json({
      success: 1,
      username: user.username,
      userId: user.id,
      email: user.email
    })
  }
  else {
    return res.json({
      fale: 1,
      msg: "Email And Password Is Wrong!"
    })
  }
})

router.post("/addNote", async (req, res) => {

  let notes = await noteModel.find({});
  let id;

  if (notes.length > 0) {
    let last_note_arr = notes.slice(-1);
    let last_note = last_note_arr[0];
    id = last_note.id + 1
    console.log("ID : ", id)
  }
  else {
    id = 1
  }

  let note = await noteModel.create({
    id: id,
    title: req.body.title,
    isImportant: req.body.isImportant,
    content: req.body.content,
    createdBy: req.body.createdBy,
  })

  return res.json(note)
})

router.get("/getAllNotesData", async (req, res) => {
  let allNotes = await noteModel.find({});
  if (allNotes.length != 0) {
    return res.json(allNotes);
  }
  else {
    return res.json({
      fale: 1,
      msg: "No Notes Found Yet !"
    })
  }
})

router.post("/getUserData", async (req, res) => {
  let userNotes = await noteModel.find({ createdBy: req.body.userId });
  let user = await userModel.findOne({ id: req.body.userId });
  let allUsersData = [];

  let isPicExist;

  if (user.profilePic) {
    isPicExist = true;
  } else {
    isPicExist = false;
  }


  if (noteModel.length != 0) {
    for (let i = 0; i < userNotes.length; i++) {
      const element = userNotes[i];
      allUsersData.push({
        id: userNotes[i].id,
        title: userNotes[i].title,
        content: userNotes[i].content,
        noteCreated: userNotes[i].dateCreated,
        createdBy: userNotes[i].createdBy,
        isImportant: userNotes[i].isImportant,
        profilePic: "http://localhost:8000/uploads/" + user.profilePic,
        msg: "Notes Found",
        username: user.username,
        email: user.email,
        name: user.name,
        joinIn: user.dateCreated,
        isPicExist: isPicExist
      })
    }

    if (allUsersData.length != 0) {
      return res.json(allUsersData)
    }
    else {

      return res.json([{
        isPicExist: isPicExist,
        profilePic: "http://localhost:8000/uploads/" + user.profilePic,
        username: user.username,
        email: user.email,
        name: user.name,
        joinIn: user.dateCreated,
        msg: "No Notes Found"
      }])
    }
  }

  else {
    return res.json({
      isPicExist: isPicExist,
      profilePic: "http://localhost:8000/uploads/" + user.profilePic,
      username: user.username,
      email: user.email,
      name: user.name,
      joinIn: user.dateCreated,
      fale: 1,
      msg: "No Notes Found"
    })
  }
})

router.post("/getNotesData", async (req, res) => {
  let notes = await noteModel.find({ createdBy: req.body.createdBy });
  let user = await userModel.findOne({ id: req.body.createdBy })

  let isPicExist;

  if (user.profilePic) {
    isPicExist = true;
  } else {
    isPicExist = false;
  }

  if (notes.length != 0) {
    return res.json(notes)
  }
  else {
    return res.json({
      isPicExist: isPicExist,
      profilePic: "http://localhost:8000/uploads/" + user.profilePic,
      username: user.username,
      email: user.email,
      name: user.name,
      joinIn: user.dateCreated,
      fale: 1,
      msg: "No Notes Found."
    })
  }
})

router.post("/getUserSomeData", async (req, res) => {
  let user = await userModel.findOne({ id: req.body.createdBy })

  let isPicExist;

  if (user.profilePic) {
    isPicExist = true;
  } else {
    isPicExist = false;
  }

  if (user) {
    return res.json({
      isPicExist: isPicExist,
      profilePic: "http://localhost:8000/uploads/" + user.profilePic,
      username: user.username,
      email: user.email,
      name: user.name,
      joinIn: user.dateCreated,
      success: 1,
      msg: "Data Found."
    })
  }
  else {
    return res.json({
      fale: 1,
      msg: "No Data Found."
    })
  }
})

router.get("/getUsersData", async (req, res) => {
  let users = await userModel.find({});
  if (users.length != 0) {
    res.json(users)
  }
  else {
    res.json({
      fale: 1,
      msg: "There Are No Users Yet !"
    })
  }
})

router.post("/getSingleNoteData", async (req, res) => {
  let note = await noteModel.findOne({ id: req.body.noteId });
  if (note) {
    return res.json(note);
  }
  else {
    return res.json({
      fale: 1,
      msg: "No Data Found !"
    })
  }
})

router.post("/uploadProfilePic", upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  let prevProfilePicUser = await userModel.findOne({ id: req.body.userId, username: req.body.username, email: req.body.email });
  console.log("PRev USER : ", prevProfilePicUser)
  if (prevProfilePicUser.profilePic !== "" && prevProfilePicUser.profilePic) {
    console.log("Entring A If Con")
    const filePath = path.join(__dirname, '../uploads/', prevProfilePicUser.profilePic);
    console.log("PAth : ", filePath)

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      let user = await userModel.updateOne({ id: req.body.userId, username: req.body.username, email: req.body.email }, { profilePic: req.file.filename });
      console.log('File deleted successfully');
    });

  }
  else {
    console.log("Entring A else Con")

    let user = await userModel.updateOne({ id: req.body.userId, username: req.body.username, email: req.body.email }, { profilePic: req.file.filename });

    if (user) {
      console.log(user)
      return res.send('File uploaded successfully.');
    }
    else {
      return res.json({
        fale: 1,
        msg: "No User Found !"
      });
    }
  }
})

router.post("/editNote", async (req, res) => {
  let user = await userModel.findOne({ id: req.body.createdBy, email: req.body.email });
  let note = await noteModel.findOneAndUpdate({ id: req.body.noteId, createdBy: user.id }, { title: req.body.title, content: req.body.content, isImportant: req.body.isImportant });

  console.log("Note : ", note);

  if (note) {
    return res.json(note);
  }
  else {
    return res.json({
      fale: 1,
      msg: `No Note Found According To ${req.body.noteId} Note Id !`
    })
  }

})

router.post("/deleteNote", async (req, res) => {
  let user = await userModel.find({id:req.body.uId,email:req.body.email});
  if(user.length != 0){
    let note = await noteModel.findOneAndDelete({id:req.body.noteId,createdBy:user[0].id});
    return res.json(note)
  }
  else{
    return res.json({
      fale2:1,
      msg:`No User Found According To ${req.body.uId} Users Id`
    })
  }
})

router.post("/getImportantNotesData",async(req,res)=>{
  console.log(req.body.userId,req.body.email)
  let user = await userModel.findOne({id:req.body.userId,email:req.body.email});
  if(user){
    let notes = await noteModel.find({createdBy:user.id,isImportant:true});
    return res.json(notes)
  }
  else{
    return res.json({
      fale:1,
      msg:"No Important Notes Found !"
    })
  }
})

// mernStackNotesApp
// Your current IP address (106.215.106.25) has been added to enable local connectivity.


module.exports = router;
