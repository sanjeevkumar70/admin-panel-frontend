import { useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import { Button, Badge, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Row, Col } from "reactstrap";
import { useAuth } from "../../../context/AuthContext";


export default function Blog() {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [category, setCategory] = useState([]);

    const [formData, setFormData] = useState({
        category: "",
        name: "",
        shortDesc: "",
        description: "",
        status: "Active",
        image: null,
    });
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
    const toggleModal = () => setModal(!modal);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/category-blog");

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const result = await response.json();
                setCategory(
                    (result.data || []).map((item) => ({
                        label: item.name,
                        value: item.slug,
                    }))
                )
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories()

    }, []);


    console.log(formData, 'ooooooooo')


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            name: "Blog Name",
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
                        placeholder="Search Blog..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        className="btn-blue"
                        onClick={toggleModal}
                    >
                        Add Blog
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
                    Add New Blog
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                    <ModalBody>

                        <Row>

                            <Col md="6">
                                <FormGroup>
                                    <Label>Category</Label>

                                    <Input
                                        type="select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select
                                        </option>
                                        {
                                            category?.map((item) =>
                                                <option value={item.value}>
                                                    {item.label}
                                                </option>
                                            )
                                        }
                                    </Input>
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
                                    <Label>Blog Name</Label>

                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Blog Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md="12">
                                <FormGroup>
                                    <Label>Blog Photo</Label>

                                    <Input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md="12">
                                <FormGroup>
                                    <Label>Short Description</Label>

                                    <Input
                                        type="textarea"
                                        rows="2"
                                        name="shortDesc"
                                        placeholder="Short Description"
                                        value={formData.shortDesc}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md="12">
                                <FormGroup>
                                    <Label>Description</Label>

                                    <Input
                                        type="textarea"
                                        rows="5"
                                        name="description"
                                        placeholder="Full Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
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
                            color="primary"
                            type="submit"
                        >
                            Save Blog
                        </Button>

                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}




