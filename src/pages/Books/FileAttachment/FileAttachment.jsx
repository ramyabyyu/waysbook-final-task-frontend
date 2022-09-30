import React from "react";
import "./FileAttachment.modules.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaPaperclip, FaUpload } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";

const FileAttachment = () => {
  const [isThumbnailAlreadyUpload, setIsThumbnailAlreadyUpload] =
    useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageData, setImageData] = useState("");
  const hiddenFileInput = useRef(null);
  const handleFileInput = (e) => hiddenFileInput.current.click();

  const handleFileChange = (files) => {
    setImageData(files);
  };

  //   useEffect for image preview
  useEffect(() => {
    if (imageData !== "") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
      };
    }
  }, []);

  return (
    <Container className="mt-5">
      {/* {isThumbnailAlreadyUpload ? () : ()} */}
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="rounded shadow border-0 p-5">
            <Form></Form>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="rounded shadow border-0 p-5">
            <h3 className="mb-5">Update Book Thumbnail</h3>
            <Form>
              <div className="mb-5">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="d-none"
                  ref={hiddenFileInput}
                  accept="image/*"
                />
                <Button type="button" variant="light" onClick={handleFileInput}>
                  <FaPaperclip className="me-2" />
                  <span>Attach Thumbnail</span>
                </Button>
              </div>
              <div className="mb-3">
                <Button
                  type="submit"
                  variant="dark"
                  className="d-flex align-items-center"
                >
                  <FaUpload className="me-2" />
                  <span>Upload</span>
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FileAttachment;
