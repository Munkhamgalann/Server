const express = require("express")
const bodyParser =require("body-parser")
const mongoose= require("mongoose")
const cors =require("cors")
const dotenv =require("dotenv")
const multer =require("multer")
const helmet =require("helmet")
const morgan =require("morgan")
const path= require("path")
const { fileURLToPath } =require("url")
const e =require("express")

// Config //

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy ({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File storage //
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename:function(req, file,cb){
        cb(null, file.originalname);
    }
})
const upload = multer ({storage});

// Mongoose setUp //
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery',false)
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app,listen(PORT, () => console.log(`Server Port:${PORT}`));
    })
    .catch((error) => console.log(`${error} did nor connect`));