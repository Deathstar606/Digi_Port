import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Progress,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

export const uploadToCloudinary = async (file, setIsImGUploading) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "galaxyReno_up"); // Replace with your preset
  formData.append("folder", "galaxyReno/services");

  try {
    if (setIsImGUploading) setIsImGUploading(true);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drliblpx7/image/upload", // Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Unknown upload error");
    }
  } catch (error) {
    alert("Cloudinary Upload Error: " + error.message);
    return null;
  } finally {
    if (setIsImGUploading) setIsImGUploading(false);
  }
};

export const uploadToGoogleDrive = async (
  tokenRef,
  file,
  setUploadProgress,
  setIsUploading
) => {
  if (!tokenRef) {
    alert("Access token not available. Please sign in.");
    return null;
  }

  try {
    if (setIsUploading) setIsUploading(true);
    if (setUploadProgress) setUploadProgress(0);

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: ["1r3-MRIDGcm3jsDNGnp2qH_rsRJYXI2EJ"], // Digi folder ID
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    const uploadRes = await axios.post(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      form,
      {
        headers: {
          Authorization: `Bearer ${tokenRef}`,
        },
        onUploadProgress: (e) => {
          if (setUploadProgress && e.total) {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          }
        },
      }
    );

    const fileId = uploadRes.data.id;
    if (!fileId) throw new Error("Upload failed");

    // Make the uploaded file public
    await axios.post(
      `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
      {
        role: "reader",
        type: "anyone",
      },
      {
        headers: {
          Authorization: `Bearer ${tokenRef}`,
        },
      }
    );

    if (setIsUploading) setIsUploading(false);
    if (setUploadProgress) setUploadProgress(100);

    return fileId;
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    if (setIsUploading) setIsUploading(false);
    return null;
  }
};

const PeopleForm = ({ uploadToCloudinary }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isImgUploading, setIsImgUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageUploadImg = async (file) => {
    const imageUrl = await uploadToCloudinary(file, setIsImgUploading);
    if (imageUrl) {
      console.log("Uploaded Image URL:", imageUrl);
    }
    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { name, designation, description, image } = formData;

      if (!name || !designation || !description || !image) {
        setMessage("Please fill in all fields before submitting.");
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      // Upload image to Cloudinary
      const imageUrl = await handleImageUploadImg(image);
      // Post case data
      const PeopleData = {
        name,
        designation,
        description,
        image: imageUrl,
      };

      const response = await axios.post(`${baseUrl}people`, PeopleData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Case created:", response.data);
      setMessage("People uploaded successfully ✅");
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting People:", error);
      setMessage("Failed to upload People ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Upload Person</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="designation">Designation</Label>
          <Input
            type="text"
            name="designation"
            id="designation"
            placeholder="Enter designation"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="image">Image File</Label>
          <Input type="file" name="image" id="image" onChange={handleChange} />
        </FormGroup>

        <Button className="butt" type="submit" disabled={loading}>
          {loading ? "Wait Please" : "Submit"}
        </Button>
        {isImgUploading && (
          <div className="my-3">
            <div>Uploading People Image...</div>
          </div>
        )}
      </Form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

const CaseStudyForm = ({
  uploadToCloudinary,
  uploadToGoogleDrive,
  accessToken,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isImgUploading, setIsImgUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUploadVid = async (file) => {
    const url = await uploadToGoogleDrive(
      accessToken,
      file,
      setUploadProgress,
      setIsUploading
    );
    return url;
  };

  const handleImageUploadImg = async (file) => {
    const imageUrl = await uploadToCloudinary(file, setIsImgUploading);
    if (imageUrl) {
      console.log("Uploaded Image URL:", imageUrl);
    }
    return imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { name, description, image, video } = formData;

      if (!name || !description || !image || !video) {
        setMessage("Please fill in all fields before submitting.");
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      // Upload image to Cloudinary
      const imageUrl = await handleImageUploadImg(image);

      // Upload video to Google Drive
      const videoID = await handleUploadVid(video);

      // Post case data
      const caseData = {
        name,
        description,
        image: imageUrl,
        video: `https://drive.google.com/file/d/${videoID}/preview`,
      };
      const response = await axios.post(`${baseUrl}cases`, caseData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Case created:", response.data);
      setMessage("Case uploaded successfully ✅");
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting case:", error);
      setMessage("Failed to upload case ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Upload Case Study</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            placeholder="Enter description"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="image">Image File</Label>
          <Input type="file" name="image" id="image" onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="video">Video File</Label>
          <Input type="file" name="video" id="video" onChange={handleChange} />
        </FormGroup>

        <Button className="butt" type="submit" disabled={loading}>
          {loading ? "Wait Please" : "Submit"}
        </Button>
        {isImgUploading && (
          <div className="my-3">
            <div>Uploading Template...</div>
          </div>
        )}
        {isUploading && (
          <div className="my-3">
            <Progress value={uploadProgress}>{uploadProgress}%</Progress>
          </div>
        )}
      </Form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

function PeopleCard({ people, updatePople, deletePeople }) {
  const [showForm, setShowForm] = useState(false);
  const [peopleId, setPropleId] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
  });

  const handleShow = (item) => {
    setSelectedCase(item);
    setPropleId(item._id);
    setFormData({
      name: item.name,
      designation: item.designation,
      description: item.description,
    });
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case?"
    );
    if (confirmDelete && deletePeople) {
      deletePeople(id);
      alert("Case deleted successfully!");
    }
  };

  const handleSubmit = async (e, _id) => {
    console.log("Submitting update for ID:", _id);
    e.preventDefault();
    await updatePople(
      _id,
      formData.name,
      formData.designation,
      formData.description
    );
    setShowForm(false);
  };

  return (
    <div
      className="d-flex flex-wrap justify-content-center gap-4 p-3"
      style={{ position: "relative" }}
    >
      {people.map((person, index) => (
        <>
          <Card
            key={index}
            style={{ width: "18rem", marginBottom: "15px" }}
            className="shadow-sm"
          >
            <img
              src={person.image}
              alt={person.name}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <CardBody>
              <CardTitle tag="h5">{person.name}</CardTitle>
              <CardText className="text-muted">{person.designation}</CardText>
              <CardText style={{ paddingBottom: "30px" }}>
                {person.description}
              </CardText>
              <div
                className="d-flex justify-content-between"
                style={{ position: "absolute", bottom: "15px", right: "15px" }}
              >
                <Button
                  onClick={() => handleShow(person)}
                  className="mr-2"
                  color="primary"
                >
                  Update
                </Button>
                <Button onClick={() => handleDelete(person._id)} color="danger">
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
          <AnimatePresence>
            {showForm && selectedCase && (
              <motion.div
                className="modal-admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="d-flex justify-content-center m-5"
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -500 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  <Container>
                    <Row className="justify-content-center ml-1 mr-1">
                      <Col
                        md={5}
                        className="p-4"
                        style={{
                          backgroundColor: "white",
                          border: "black solid 2px",
                          position: "relative",
                        }}
                      >
                        <h2 className="text-center mb-4">Add People</h2>
                        <Form onSubmit={(e) => handleSubmit(e, peopleId)}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              style={{
                                border: "2px solid black",
                                backgroundColor: "transparent",
                              }}
                              className="rounded-0"
                              placeholder="Enter Person name"
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Designation</Label>
                            <Input
                              name="designation"
                              type="text"
                              value={formData.designation}
                              onChange={handleChange}
                              style={{
                                border: "2px solid black",
                                backgroundColor: "transparent",
                              }}
                              className="rounded-0"
                              placeholder="Enter Person designation"
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Description</Label>
                            <Input
                              name="description"
                              type="textarea"
                              value={formData.description}
                              onChange={handleChange}
                              style={{
                                border: "2px solid black",
                                backgroundColor: "transparent",
                                height: "150px",
                              }}
                              className="rounded-0"
                              placeholder="Enter Person description"
                              required
                            />
                          </FormGroup>
                          <div className="d-flex justify-content-center pb-2 pt-2 home-butt">
                            <button className="butt mr-2" type="submit">
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={handleClose}
                              className="butt"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ))}
    </div>
  );
}

function CasesCard({ cases, deleteCase, updateCase }) {
  const [showForm, setShowForm] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleShow = (item) => {
    setSelectedCase(item);
    setCaseId(item._id);
    setFormData({ name: item.name, description: item.description });
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case?"
    );
    if (confirmDelete && deleteCase) {
      deleteCase(id);
      alert("Case deleted successfully!");
    }
  };

  const handleSubmit = async (e, _id) => {
    e.preventDefault();
    await updateCase(_id, formData.name, formData.description);
    setShowForm(false);
  };

  return (
    <div
      className="d-flex flex-wrap justify-content-center gap-4 p-3"
      style={{ position: "relative" }}
    >
      {cases.map((item, index) => (
        <>
          <Card key={index} style={{ width: "18rem" }} className="shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <CardBody>
              <CardTitle tag="h5">{item.name}</CardTitle>
              <CardText style={{ paddingBottom: "30px" }}>
                {item.description}
              </CardText>
              <div
                className="d-flex justify-content-between"
                style={{ position: "absolute", bottom: "15px", right: "15px" }}
              >
                <Button
                  onClick={() => handleShow(item)}
                  className="mr-2"
                  color="primary"
                >
                  Update
                </Button>
                <Button onClick={() => handleDelete(item._id)} color="danger">
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
          <AnimatePresence>
            {showForm && selectedCase && (
              <motion.div
                className="modal-admin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="d-flex justify-content-center m-5"
                  initial={{ opacity: 0, y: -500 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -500 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  <Container>
                    <Row className="justify-content-center ml-1 mr-1">
                      <Col
                        md={5}
                        className="p-4"
                        style={{
                          backgroundColor: "white",
                          border: "black solid 2px",
                          position: "relative",
                        }}
                      >
                        <h2 className="text-center mb-4">Add Categories</h2>
                        <Form onSubmit={(e) => handleSubmit(e, caseId)}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              style={{
                                border: "2px solid black",
                                backgroundColor: "transparent",
                              }}
                              className="rounded-0"
                              placeholder="Enter case name"
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Description</Label>
                            <Input
                              name="description"
                              type="textarea"
                              value={formData.description}
                              onChange={handleChange}
                              style={{
                                border: "2px solid black",
                                backgroundColor: "transparent",
                                height: "150px",
                              }}
                              className="rounded-0"
                              placeholder="Enter case description"
                              required
                            />
                          </FormGroup>
                          <div className="d-flex justify-content-center pb-2 pt-2 home-butt">
                            <button className="butt mr-2" type="submit">
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={handleClose}
                              className="butt"
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ))}
    </div>
  );
}

const AdminComp = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);

  const CLIENT_ID =
    "631732047886-96fl23jud9deq0e40f7ndo54rpguf5th.apps.googleusercontent.com";
  const SCOPES = "https://www.googleapis.com/auth/drive";

  const tokenClientRef = useRef(null);
  const accessTokenRef = useRef(null);

  const handleChangeAdmin = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitAdmin = (e) => {
    e.preventDefault();
    props.loginUser(credentials);
  };

  useEffect(() => {
    // ✅ 1. Ensure Google Identity Services script is loaded
    const loadGsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.accounts) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = () => reject("Failed to load Google Identity script.");
        document.body.appendChild(script);
      });
    };

    // ✅ 2. Initialize token client after script load
    const initTokenClient = async () => {
      await loadGsiScript();

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          accessTokenRef.current = tokenResponse.access_token;
          console.log("✅ Access token received:", accessTokenRef.current);
          setIsSignedIn(true);
        },
      });
    };

    initTokenClient().catch((err) =>
      console.error("Failed to initialize token client:", err)
    );
  }, []);

  const handleSignIn = () => {
    if (!tokenClientRef.current) {
      console.error("Google Token Client not initialized yet.");
      return;
    }

    // ✅ Request access token (triggers Google Sign-in popup)
    tokenClientRef.current.requestAccessToken();
  };

  return !props.auth.isAuthenticated ? (
    <Container
      style={{ height: "100vh" }}
      className="p-4 d-flex align-items-center justify-content-center"
    >
      <Col md={6} xs={12}>
        <Form onSubmit={handleSubmitAdmin} className="p-4 border-0 shadow">
          <h2 className="mb-4 text-center" style={{ color: "rgb(255, 94, 0)" }}>
            Admin Login
          </h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              style={{
                border: "2px solid black",
                backgroundColor: "transparent",
              }}
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChangeAdmin}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              style={{
                border: "2px solid black",
                backgroundColor: "transparent",
              }}
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChangeAdmin}
              required
            />
          </FormGroup>
          <div className="d-flex justify-content-center my-2">
            <Button className="butt" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Container>
  ) : (
    <>
      <Container>
        <Row>
          <Col md={6} xs={6}>
            <h1
              style={{
                marginTop: "100px",
                color: "rgb(255, 94, 0)",
                fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2rem)",
                paddingTop: "5px",
              }}
            >
              Admin Page
            </h1>
          </Col>
          <Col
            md={6}
            xs={6}
            className="d-flex justify-content-end align-items-center"
          >
            <div className="d-flex" style={{ marginTop: "100px" }}>
              <div className="mt-2 mr-1">{props.auth.user.username}</div>
              <div
                style={{ cursor: "pointer", display: "inline-block" }}
                className="butt"
                onClick={props.logoutUser}
              >
                Logout
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <h3 className="mt-5 text-center">Personel Information</h3>
      <PeopleCard
        people={props.people}
        updatePople={props.updatePople}
        deletePeople={props.deletePeople}
      />

      <h3 className="mt-3 text-center">Case Studies</h3>
      <CasesCard
        cases={props.cases}
        updateCase={props.updateCase}
        deleteCase={props.deleteCase}
      />

      <Container className="my-2 pb-5">
        <Row>
          <Col md="6" xs="12">
            <PeopleForm uploadToCloudinary={uploadToCloudinary} />
          </Col>
          <Col
            md="6"
            xs="12"
            className="d-flex justify-content-center align-items-center"
          >
            {!isSignedIn ? (
              <Button color="secondary" onClick={handleSignIn}>
                Sign in with Google
              </Button>
            ) : (
              <CaseStudyForm
                uploadToCloudinary={uploadToCloudinary}
                uploadToGoogleDrive={uploadToGoogleDrive}
                accessToken={accessTokenRef.current}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminComp;
