import { useState, useEffect } from "react";
import { Edit, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Button,
  Badge,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";

export default function CategoryBlog() {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const token = JSON.parse(localStorage.getItem("user")).token;

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    status: true,
  });

  //Fetch categories (GET)
  useEffect(() => {
    fetch("http://localhost:5000/api/category-blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data?.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : value,
    }));
  };

  //  Add or Update (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update (PUT)
        await fetch(`http://localhost:5000/api/category-blog/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            status: formData.status,
          }),
        });
      } else {
        // Add (POST)
        method: "POST",
          await fetch("http://localhost:5000/api/category-blog", {
            method: "POST", headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.name,
              status: formData.status,
            }),
          });
      }
      // Refresh list
      setRefresh(Math.random() + new Date());
      setFormData({
        id: null,
        name: "",
        status: false
      })

      toggleModal();
    } catch (err) {
      console.error(err);
    }
  };

  //  Edit
  const handleEdit = (row) => {
    setFormData({
      id: row._id,
      name: row.name,
      status: row.status,
      image: null,
    });
    setModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await fetch(`http://localhost:5000/api/category-blog/${id}`, {
        headers: { "Authorization": `Bearer ${token}` },
        method: "DELETE",
      });

      setBlogs((prev) => prev.filter((item) => item.id !== id));
      // Refresh list
      setRefresh(Math.random() + new Date())
    }
  };

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) =>
      blog.name.toLowerCase().includes(search.toLowerCase())
    )
    : [];


  const columns = [
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
      name: "Slug",
      selector: (row) => row.slug || row.name,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div>
          <h6 className="mb-0 fw-bold">{row.slug || row.name}</h6>
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
          color={row.status ? "success" : "secondary"}
          pill
        >
          {row.status ? "Active" : "Inactive"}
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
            color="danger"
            size="sm"
            onClick={() => handleDelete(row._id)}
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
          <Button className="btn-blue" onClick={toggleModal}>
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
      <Modal isOpen={modal} toggle={toggleModal} size="lg" centered>
        <ModalHeader toggle={toggleModal}>
          {formData.id ? "Edit Category" : "Add New Category"}
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
                    value={String(formData.status)}
                    onChange={handleChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              {formData.id ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}
