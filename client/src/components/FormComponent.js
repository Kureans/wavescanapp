import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [scanningMode, setScanningMode] = useState("GANTRY");
  const [scanDimensionX, setScanDimensionX] = useState();
  const [scanDimensionY, setScanDimensionY] = useState();
  const [scannerFrequency, setScannerFrequency] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isValidSubmission, setIsValidSubmission] = useState(false);
  const [scannedImage, setScannedImage] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:5000/form", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          scanningMode: scanningMode,
          scanDimensionsX: scanDimensionX,
          scanDimensionsY: scanDimensionY,
          scannerFrequency: scannerFrequency,
        }),
      });
      
      let resJson = await res.json();

      console.log(resJson);
      if (res.status === 200) {
        setProjectName("");
        setScanningMode("GANTRY");
        setScanDimensionX("");
        setScanDimensionY("");
        setScannerFrequency("");
        setIsValidSubmission(true);
        setErrorMessage();
        getScannedImage();
      } else {
        setIsValidSubmission(false);
        setErrorMessage(resJson.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let getScannedImage = async () => {
    let res = await fetch("http://localhost:5000/image", {
      mode: "cors",
      method: "GET",
    });

    let imageBlob = await res.blob();
    let imageObjectURL = URL.createObjectURL(imageBlob);
    setScannedImage(imageObjectURL);
  };

  if (isValidSubmission) {
    return (
      <div className="ScannedImageContainer">
        <img src={scannedImage} alt="Scanned Object" />
      </div>
    );
  }
  return (
    <div className="ProjectFormContainer">
      <Form className="ProjectForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formProjectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Project Name"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formScanningMode">
          <Form.Label>Scanning Mode</Form.Label>
          <Form.Select onChange={(e) => setScanningMode(e.target.value)}>
            <option value="GANTRY">Gantry</option>
            <option value="CRAWLER">Crawler</option>
            <option value="AUTO">Auto</option>
            <option value="MANUAL">Manual</option>
            <option value="ARM">Arm</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formScanDimensions">
          <Form.Label>Scan Dimensions (cm)</Form.Label>
          <Container>
            <Row>
              <Col xs={12} sm={1}>
                <Form.Label>X</Form.Label>
              </Col>
              <Col xs={12} sm={5}>
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setScanDimensionX(e.target.value)}
                />
              </Col>
              <Col xs={12} sm={1}>
                <Form.Label>Y</Form.Label>
              </Col>
              <Col xs={12} sm={5}>
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => setScanDimensionY(e.target.value)}
                />
              </Col>
            </Row>
          </Container>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formScannerFrequency">
          <Form.Label>Scanner Frequency (GHz)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Scanner Frequency"
            onChange={(e) => setScannerFrequency(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" value="Submit">
            SCAN
          </Button>
        </div>
      </Form>
      {errorMessage && !isValidSubmission && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}
    </div>
  );
}

export default ProjectForm;
