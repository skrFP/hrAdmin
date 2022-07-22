import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { useFormik } from "formik"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getUsers as onGetUsers,
  deleteUser as onDeleteUser,
} from "store/users/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const UserWallet = props => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const token = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ` + token,
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (contact && contact.id) || "",
      lastName: (contact && contact.lastName) || "",
      firstName: (contact && contact.firstName) || "",
      point: (contact && contact.point) || "",
      wallet: (contact && contact.wallet) || "",
    },

    onSubmit: values => {
      axios
        .put(
          `http://128.199.128.37/api/v1/cvs/${contact.id}`,
          {
            lastName: values.lastName,
            firstName: values.firstName,
            point: values.point,
            wallet: values.wallet,
          },
          { headers }
        )
        .then(result => {
          console.log(...result.data.data)
        })
        .catch(error => {
          console.log(error)
        })
      validation.resetForm()
      setIsEdit(false)
      toggle()
    },
  })

  const { users } = useSelector(state => ({
    users: state.users.users,
  }))

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search
  const sizePerPage = 10
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  }
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: index => <>{index}</>,
    },

    {
      text: "Хэрэглэгчийн нэр",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.firstName}
            </Link>
          </h5>
          <p className="text-muted mb-0">{user.lastName}</p>
        </>
      ),
    },
    {
      text: "Хэрэглэгчийн пойнт",
      dataField: "point",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.point}P
            </Link>
          </h5>
        </>
      ),
    },
    {
      dataField: "wallet",
      text: "Хэрэглэгчийн хэтэвч",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.wallet}₮
            </Link>
          </h5>
        </>
      ),
    },

    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Тохиргоо",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg
    console.log(user)
    setContact({
      id: user._id,
      lastName: user.lastName,
      firstName: user.firstName,
      point: user.point,
      wallet: user.wallet,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact._id))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Хэрэглэгчийн хэтэвч</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Хэрэглэгч" breadcrumbItem="Хэрэглэгч хэтэвч" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={users}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={e => {
                                            e.preventDefault()
                                            validation.handleSubmit()
                                            return false
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Хэрэглэгчийн овог
                                                </Label>
                                                <Input
                                                  name="lastName"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values
                                                      .lastName || ""
                                                  }
                                                  invalid={
                                                    validation.touched
                                                      .lastName &&
                                                    validation.errors.lastName
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Хэрэглэгч нэр
                                                </Label>
                                                <Input
                                                  name="firstName"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values
                                                      .firstName || ""
                                                  }
                                                  invalid={
                                                    validation.touched
                                                      .firstName &&
                                                    validation.errors.firstName
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  point
                                                </Label>
                                                <Input
                                                  name="point"
                                                  label="point"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.point ||
                                                    ""
                                                  }
                                                  invalid={
                                                    validation.touched.point &&
                                                    validation.errors.point
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  wallet
                                                </Label>
                                                <Input
                                                  name="wallet"
                                                  label="wallet"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.wallet ||
                                                    ""
                                                  }
                                                  invalid={
                                                    validation.touched.wallet &&
                                                    validation.errors.wallet
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Хадгалах
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserWallet)
