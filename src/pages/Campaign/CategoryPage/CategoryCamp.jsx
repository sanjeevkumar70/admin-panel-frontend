
import { Edit, Trash2 } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Row, Col } from "reactstrap";


export default function CategoryCamp() {
  const [search, setSearch] = useState("");

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      name: "React Tutorial",
      image: "https://picsum.photos/80?1",
      status: "Active",
    },
    {
      id: 2,
      name: "Node.js Guide",
      image: "https://picsum.photos/80?2",
      status: "Inactive",
    },
    {
      id: 3,
      name: "JavaScript Basics",
      image: "https://picsum.photos/80?3",
      status: "Active",
    },
    {
      id: 4,
      name: "CSS Tricks",
      image: "https://picsum.photos/80?4",
      status: "Active",
    },
  ]);


  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    shortDesc: "",
    description: "",
    status: "Active",
    image: null,
  });
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setImages(files);

    setFormData((prev) => ({
      ...prev,
      image: acceptedFiles[0],
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });


  const toggleModal = () => {
    setModal(!modal);

    if (modal) {
      setImages([]);

      setFormData({
        category: "",
        name: "",
        shortDesc: "",
        description: "",
        status: "Active",
        image: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    toggleModal();
  };

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "Image",
      width: "120px",
      cell: (row) => (
        <div className="image-wrapper">

          <img
            src={row.image}
            alt={row.name}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div>
          <h6 className="mb-0 fw-bold">{row.name}</h6>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      cell: (row) => (
        <Badge
          color={row.status === "Active" ? "success" : "secondary"}
          pill
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Actions",
      center: true,
      width: "180px",
      cell: (row) => (
        <div className="d-flex gap-1">
          <Button
            color="primary"
            size="sm"
            className="btn-green"
            onClick={() => handleEdit(row)}
          >
            <Edit size={15} />
          </Button>

          <Button
            color="danger" m
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <div className="card-header-wrapper mb-1">
        <div className="d-flex justify-content-between align-items-center">
          <Input
            style={{ width: "250px" }}
            placeholder="Search Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="btn-blue"
            onClick={toggleModal}
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="datatable-wrapper">
        <DataTable
          columns={columns}
          data={filteredBlogs}
          responsive
          striped
          persistTableHead
        />
      </div>



      <Modal
        isOpen={modal}
        toggle={toggleModal}
        size="lg"
        centered
      >
        <ModalHeader toggle={toggleModal}>
          Add New Category
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <ModalBody>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Category Name</Label>

                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter Category Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Status</Label>

                  <Input
                    type="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </Input>
                </FormGroup>
              </Col>


              <Col md="12">
                <FormGroup>
                  <Label>Category Photo</Label>

                  <div
                    {...getRootProps()}
                    style={{
                      border: "2px dashed #999",
                      padding: 30,
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>Drag & Drop or Click</p>
                    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                      {images.length > 0 && (
                        <div style={
                          { width: "100%", }}>
                          {images.map((img) => (
                            <img
                              key={img.name}
                              src={img.preview}
                              alt={img.name}
                              width={120}
                              height={120}
                              style={{
                                objectFit: "cover",
                                borderRadius: 8,
                                width: "100%",
                                border: "1px solid #ddd",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </FormGroup>
              </Col>

            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={toggleModal}
            >
              Cancel
            </Button>

            <Button
              className="btn-blue"
              type="submit"
            >
              Add
            </Button>

          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
