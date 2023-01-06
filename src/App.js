import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useState } from "react";
/**
 * https://stackoverflow.com/questions/59701050/how-to-pass-data-from-a-page-to-another-page-using-react-router
 */
function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
  return new Promise((resolve) => {
    console.log(base64Str);
    let img = new Image();
    img.src = "data:image/png;base64," + base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;
      let shouldResize = false;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          shouldResize = true;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
          shouldResize = true;
        }
      }
      if (shouldResize) {
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } else {
        resolve("data:image/png;base64," + base64Str);
      }
    };
  });
}
const Test1 = ({ location }) => {
  const [file, setfile] = useState([]);
  const [link, setLink] = useState("");
  const navigate = useHistory();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  console.log(location);
  const handleImageChange = ({ currentTarget: { files } }) => {
    console.log(files);
    if (files && files.length) {
      setfile(files[0]);
      navigate.replace("/test1", { state: { id: 1, file: files[0] } });
      // setInputTattoos((existing) => existing.concat(Array.from(files)));
    }
    // Reset the input by forcing a new one
  };
  location.state &&
    location.state.state &&
    location.state.state.file &&
    console.log("Route data", location.state.state.file);
  if (location.state && location.state.state && location.state.state.file) {
    const fd = new FormData();
    fd.append(
      "image",
      location.state.state.file,
      location.state.state.file.name
    );
    axios
      .post(
        "https://inpixio-remove-bg-zceht2uy2q-ey.a.run.app/image/remove_bg",
        fd
      )
      .then((res) => setLink("data:image/png;base64," + res.data.image))
      .then(() => handleChange());
  }
  const handleChange = () => {
    setImagePreviewUrl(link);
  };
  return (
    <main id="page">
      <div className="upload-another">
        <label className="upload__button">
          <b className="plus"></b>
          <span>UPLOAD YOUR PHOTO</span>

          <input
            type="file"
            className="file-choose"
            onChange={handleImageChange}
          />
        </label>
        <small>or drop a file, paste an image from a link.</small>
      </div>
      <div className="container v2 container-main flex uploaded-container">
        <div className="page-col_left">
          <h1>
            The <span>#1</span> One-Click​ Background Remover​
          </h1>
        </div>
        <div className="page-col_right">
          <div className="uploaded-result_wrap">
            <div className="uploaded-result_image">
              {imagePreviewUrl && <img src={imagePreviewUrl} alt="" />}
              <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="uploaded-result_actions">
              <div className="uploaded-result_actions-block">
                <a href="" className="result-btn">
                  Download
                </a>
                <small>Preview Image Low resolution</small>
              </div>
              <div className="uploaded-result_actions-block">
                <a href="" className="result-btn outline">
                  Download HD
                </a>
                <small>Full resolution image 2572 × 2248 pixels</small>
              </div>
            </div>
          </div>
          <div className="uploaded-legal">
            <small>
              By uploading an image you agree to our Terms of Service and{" "}
              <a href="/privacy-policy/" target="_blank">
                Privacy Policy
              </a>
              .
            </small>
          </div>
        </div>
      </div>
      <div className="dragover-overlay">
        <div className="dragover-overlay_wrap">
          <div className="dragover-overlay_inner">
            <img
              src="assets/img/icon-file.svg"
              width="100"
              height="125"
              alt="Add  Icon"
            />
            <h4 className="label">
              Drop one image <br />
              anywhere in the screen
            </h4>
          </div>
        </div>
      </div>
    </main>
  );
};

const Test2 = ({ location }) => {
  console.log("Test 2");
  return (
    <div>
      <h2>Test 2</h2>

      <Link to="/">
        <button>GO HOME</button>
      </Link>
      <Link to="/test1">
        <button>Go to TEST 1</button>
      </Link>
      <Link
        to={{
          pathname: "/test1",
          state: {
            data: "From Test 2!!"
          }
        }}
      >
        <button>Go to TEST 1 With Data</button>
      </Link>
    </div>
  );
};

const Home = () => {
  const [file, setfile] = useState([]);

  const navigate = useHistory();
  const [inputTattoos, setInputTattoos] = useState([]);
  const [inputKey, setInputKey] = useState(0);

  const upload = (filedata) => {
    console.log("in the upload");
    navigate.push("/test1", { state: { id: 1, file: filedata } });
  };

  const handleImageChange = ({ currentTarget: { files } }) => {
    console.log(files);
    if (files && files.length) {
      setfile(files[0]);

      // setInputTattoos((existing) => existing.concat(Array.from(files)));
      upload(files[0]);
    }
    // Reset the input by forcing a new one
    setInputKey((key) => key + 1);
  };
  return (
    <main id="page">
      <div className="container v2 container-main flex">
        <div className="page-col_left">
          <h1>
            The <span>#1</span>​ One-Click​ Background Remover​
          </h1>
          <img
            src="https://www.inpixio.com/remove-background/images/new/example.png"
            width="769"
            height="505"
            alt="Remove background"
          />
          <div className="ratings">
            <div className="rating">
              <a
                href="https://www.trustpilot.com/review/inpixio.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="145"
                  height="68"
                  src="https://www.inpixio.com/remove-background/images/new/logo-trustpilot.svg"
                  alt="Trustpilot"
                />
              </a>
            </div>
            <div className="rating">
              <a
                href="https://www.capterra.com/p/213175/inPixio-Photo-Studio/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="145"
                  height="53"
                  src="https://www.inpixio.com/remove-background/images/new/logo-capterra.svg"
                  alt="Capterra"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="page-col_mid">
          <img
            src="https://www.inpixio.com/remove-background/images/new/icon-arrow.svg"
            width="150"
            height="80"
            alt="background eraser"
          />
        </div>
        <div className="page-col_right">
          <div className="loading">
            <div className="loading__wrap">
              <div className="c-upload">
                <div className="c-upload__local">
                  <p className="c-upload__drag file-drop">
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/icon-file.svg"
                      width="479"
                      height="277"
                      alt="Upload"
                    />
                  </p>
                  <div className="c-upload__choose">
                    <label className="upload__button">
                      <b className="plus"></b>
                      <span>UPLOAD YOUR PHOTO</span>

                      <input
                        key={inputKey}
                        type="file"
                        className="file-choose"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <p>Or drag and drop a file</p>
              <div className="default-images flex">
                <div className="default-images_label">
                  No image? <br />
                  Try one of these :
                </div>
                <div className="default-images_select">
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/portrait.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-portrait.jpg"
                      width="60"
                      height="60"
                      alt="example portrait"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/product.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-products.jpg"
                      width="60"
                      height="60"
                      alt="example product"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/car.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-car.jpg"
                      width="60"
                      height="60"
                      alt="example car"
                    />
                  </a>
                  <a
                    href="https://www.inpixio.com/remove-background/images/new/examples/dog.jpg"
                    className="example-image"
                  >
                    <img
                      src="https://www.inpixio.com/remove-background/images/new/example-dog.jpg"
                      width="60"
                      height="60"
                      alt="example dog"
                    />
                  </a>
                </div>
              </div>
              <p id="error-message"></p>
            </div>
            <div className="loading__overlay">
              <span></span>
            </div>
          </div>
          <small>
            By uploading an image you agree to our Terms of Serviceand{" "}
            <a href="/privacy-policy/" target="_blank">
              Privacy Policy
            </a>
            .
          </small>
        </div>
      </div>
    </main>
  );
};

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/test1" component={Test1} />
        <Route path="/test2" component={Test2} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
