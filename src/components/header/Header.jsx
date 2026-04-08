import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory, getparentcategory } from '../../redux/slice/category.slice';
import { logoutuser } from '../../redux/slice/auth.slice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ThemeContext } from '../../Context/ThemeContext';
import Switch from '@mui/material/Switch';


function Header(props) {

  const themecontext = useContext(ThemeContext);
  
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    themecontext.toggleTheme(themecontext.theme)
  };

  console.log(themecontext)

  const dispatch = useDispatch();
  const categorys = useSelector(state => state.category)
  const auth = useSelector(state => state.auth)

  console.log("auth", auth)

  useEffect(() => {
    dispatch(getcategory());
  }, [])

  console.log("category", categorys.category)
  const x = categorys?.category?.filter((v) => v.parent_category_id === null)
  //const yy = categorys.category.filter((vv) => vv.parent_category_id === "69992ff6e420eb019b34b5be")
  //console.log('category', categorys?.category?.filter((vv) => vv.parent_category_id === "69992ff6e420eb019b34b5be"))
  
  return (
    <header className="navbar-light navbar-sticky header-static">
      {/* Logo Nav START */}
      <nav className="navbar navbar-expand-xl">
        <div className="container-fluid px-3 px-xl-5">
          {/* Logo START */}
          <NavLink to="/" className="navbar-brand">
            <img className="light-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo" />
            <img className="dark-mode-item navbar-brand-item" src="assets/images/logo-light.svg" alt="logo" />
          </NavLink>
          {/* Logo END */}
          {/* Responsive navbar toggler */}
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-animation">
              <span />
              <span />
              <span />
            </span>
          </button>
          {/* <i className="bi bi-ui-radios-grid me-2" /> */}
          {/* Main navbar START */}
          <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
            {/* Nav category menu START */}
            <ul className="navbar-nav navbar-nav-scroll me-auto">
              <li className="nav-item dropdown">

                <a className="nav-link dropdown-toggle active" href="#" id="demoMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="bi bi-ui-radios-grid me-2" />categorys</a>
                <ul className="dropdown-menu " aria-labelledby="demoMenu">
                  {
                    x?.map((v) => {
                      const subchild = categorys.category.filter((vv) => vv.parent_category_id === v._id)
                      return <li><a className="dropdown-item">
                        <>
                          <li className="dropdown-submenu dropend">
                            <a className={subchild.length > 0 ? "dropdown-item dropdown-toggle" : "navitems"} style={{ padding: '0' }} href="#">{v.name}</a>

                            {
                              subchild.length > 0 &&

                              <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none" style={{ padding: '4px' }}>
                                {

                                  subchild.map((v1) => {
                                    const subsubchild = categorys.category.filter((vv2) => vv2.parent_category_id === v1._id);
                                    console.log(v1);

                                    return <li className="dropdown-submenu dropend">
                                      <a href="#" className={subsubchild.length > 0 ? "dropdown-item dropdown-toggle" : "navitems"}>{v1.name}</a>
                                      {subsubchild.length > 0 &&
                                        <ul className="dropdown-menu dropdown-menu-start" style={{ padding: '4px' }} data-bs-popper="none">
                                          {
                                            subsubchild.map((v2) => (
                                              <li>
                                                <a href="#" className="navitems" >{v2.name}</a>
                                              </li>
                                            ))
                                          }
                                        </ul>
                                      }
                                    </li>


                                  })
                                }
                              </ul>
                            }
                            {/* {categorys.category.map((v1) => {
                              if (v1.parent_category_id === v._id) {
                                console.log(v.name)
                                return <>
                                  <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                                    <a href="#" className="navitems">{v1.name}</a>
                                  </ul>
                                </>

                              } */}
                            {/* }) */}
                            {/* } */}
                          </li>
                        </>


                      </a></li>


                    })
                  }
                  <li>
                    <NavLink to="/categories" className="dropdown-item fw-bold">
                      Display all
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Nav category menu END */}
            {/* Nav Main menu START */}
            <ul className="navbar-nav navbar-nav-scroll me-auto">

              {/* Nav item 1 Demos */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="#" id="demoMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Demos</a>
                <ul className="dropdown-menu " aria-labelledby="demoMenu">
                  <li> <a className="dropdown-item active" href="index.html">Home Default</a></li>
                  <li> <a className="dropdown-item" href="index-2.html">Home Education</a></li>
                  <li> <a className="dropdown-item" href="index-3.html">Home Academy</a></li>
                  <li> <a className="dropdown-item" href="index-4.html">Home Course</a></li>
                  <li> <a className="dropdown-item" href="index-5.html">Home University</a></li>
                  <li> <a className="dropdown-item" href="index-6.html">Home Kindergarten</a></li>
                  <li> <a className="dropdown-item" href="index-7.html">Home Landing</a></li>
                  <li> <a className="dropdown-item" href="index-8.html">Home Tutor</a></li>
                  <li> <hr className="dropdown-divider" /></li>
                  <NavLink to="/requestdemo" className="navitems">Request a demo</NavLink>
                  <NavLink to="/bookclass" className="navitems">Book a Class</NavLink>
                  <NavLink to="/requestaccess" className="navitems">Free Access</NavLink>
                  <NavLink to="/admissionform" className="navitems">Admission Form</NavLink>
                  <li> <a className="dropdown-item" href="university-admission-form.html">Admission Form</a></li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">Dropdown levels</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      {/* dropdown submenu open right */}
                      <li className="dropdown-submenu dropend">
                        <a className="dropdown-item dropdown-toggle" href="#">Dropdown (end)</a>
                        <ul className="dropdown-menu" data-bs-popper="none">
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                        </ul>
                      </li>
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                      {/* dropdown submenu open left */}
                      <li className="dropdown-submenu dropstart">
                        <a className="dropdown-item dropdown-toggle" href="#">Dropdown (start)</a>
                        <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                        </ul>
                      </li>
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* Nav item 2 Pages */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                  {/* Dropdown submenu */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">Course</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      <NavLink to="/coursegridclassic" className="navitems">Course Grid Classic</NavLink>
                      <NavLink to="/coursegridminimal" className="navitems">Course Grid Minimal</NavLink>
                      <li> <hr className="dropdown-divider" /></li>
                      <NavLink to="/courselistclassic" className="navitems">Course List Classic</NavLink>
                      <NavLink to="/courselistminimal" className="navitems">Course List Minimal</NavLink>
                      <li> <hr className="dropdown-divider" /></li>
                      <NavLink to="/coursedetailclassic" className="navitems">Course Detail Classic</NavLink>
                      <NavLink to="/coursedetailminimal" className="navitems">Course Detail Minimal</NavLink>
                      <NavLink to="/coursedetailadvance" className="navitems">Course Detail Advance</NavLink>
                      <NavLink to="/coursescreenvideo" className="navitems">Course Full Screen Video</NavLink>
                    </ul>
                  </li>
                  {/* Dropdown submenu */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">About</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      <NavLink to="/about" className="navitems">About</NavLink>
                      <NavLink to="/contactus" className="navitems">Contact Us</NavLink>
                      <NavLink to="/bloggrid" className="navitems">Blog Grid</NavLink>
                      <NavLink to="/blogmasonry" className="navitems">Blog Masonry</NavLink>
                      <NavLink to="/blogdetail" className="navitems">Blog Detail</NavLink>
                      <NavLink to="/price" className="navitems">Pricing</NavLink>
                    </ul>
                  </li>
                  <NavLink to="/instructorlist" className="navitems">Instructor List</NavLink>
                  <NavLink to="/instructorsinglet" className="navitems">Instructor Single</NavLink>
                  <NavLink to="/becomeinstructor" className="navitems">Become an Instructor</NavLink>
                  {/* Dropdown submenu */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">Authentication</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      <NavLink to="/signin" className="navitems">Sign In</NavLink>
                      <NavLink to="/signup" className="navitems">Sign Up</NavLink>
                      <NavLink to="/forgetpassword" className="navitems">Forgot Password</NavLink>
                    </ul>
                  </li>
                  <NavLink to="/faq" className="navitems">FAQs</NavLink>
                  <NavLink to="/error404" className="navitems">Error 404</NavLink>
                  <NavLink to="/comingsoon" className="navitems">Coming Soon</NavLink>
                  <NavLink to="/cart" className="navitems">Cart</NavLink>
                  <NavLink to="/checkout" className="navitems">Checkout</NavLink>
                  <NavLink to="/emptycart" className="navitems">Empty Cart</NavLink>
                  <NavLink to="/wishlist" className="navitems">Wishlist</NavLink>
                </ul>
              </li>
              {/* Nav item 3 Account */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="accounntMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Accounts</a>
                <ul className="dropdown-menu" aria-labelledby="accounntMenu">
                  {/* Dropdown submenu */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-tie fa-fw me-1" />Instructor</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      <NavLink to="/instructordashboard" className="navitems">Dashboard</NavLink>
                      <NavLink to="/instructorcourses" className="navitems">Courses</NavLink>
                      <NavLink to="/createcourse" className="navitems">Create Course</NavLink>
                      <NavLink to="/addcourse" className="navitems">Course Added</NavLink>
                      <NavLink to="/earnings" className="navitems">Earnings</NavLink>
                      <NavLink to="/studentlist" className="navitems">Students</NavLink>
                      <NavLink to="/orders" className="navitems">Orders</NavLink>
                      <NavLink to="/review" className="navitems">Reviews</NavLink>
                      <NavLink to="/payout" className="navitems">Payout</NavLink>
                      {/* <li> <a className="dropdown-item" href="instructor-dashboard.html"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</a> </li>
                      <li> <a className="dropdown-item" href="instructor-manage-course.html"><i className="bi bi-basket-fill fa-fw me-1" />Courses</a> </li>
                      <li> <a className="dropdown-item" href="instructor-create-course.html"><i className="bi bi-file-earmark-plus-fill fa-fw me-1" />Create Course</a> </li>
                      <li> <a className="dropdown-item" href="course-added.html"><i className="bi bi-file-check-fill fa-fw me-1" />Course Added</a> </li>
                      <li> <a className="dropdown-item" href="instructor-earning.html"><i className="fas fa-chart-line fa-fw me-1" />Earnings</a> </li>
                      <li> <a className="dropdown-item" href="instructor-studentlist.html"><i className="fas fa-user-graduate fa-fw me-1" />Students</a> </li>
                      <li> <a className="dropdown-item" href="instructor-order.html"><i className="bi bi-cart-check-fill fa-fw me-1" />Orders</a> </li>
                      <li> <a className="dropdown-item" href="instructor-review.html"><i className="bi bi-star-fill fa-fw me-1" />Reviews</a> </li>
                      <li> <a className="dropdown-item" href="instructor-payout.html"><i className="fas fa-wallet fa-fw me-1" />Payout</a> </li> */}
                    </ul>
                  </li>
                  {/* Dropdown submenu */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-graduate fa-fw me-1" />Student</a>
                    <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                      <NavLink to="/studentdashboard" className="navitems">Dashboard</NavLink>
                      <NavLink to="/studentsubscriptions" className="navitems">My Subscriptions</NavLink>
                      <NavLink to="/studentdcourses" className="navitems">Courses</NavLink>
                      <NavLink to="/studentpaymentinfo" className="navitems">Payment Info</NavLink>
                      {/* <li> <a className="dropdown-item" href="student-dashboard.html"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</a> </li>
                      <li> <a className="dropdown-item" href="student-subscription.html"><i className="bi bi-card-checklist fa-fw me-1" />My Subscriptions</a> </li>
                      <li> <a className="dropdown-item" href="student-course-list.html"><i className="bi bi-basket-fill fa-fw me-1" />Courses</a> </li>
                      <li> <a className="dropdown-item" href="student-payment-info.html"><i className="bi bi-credit-card-2-front-fill fa-fw me-1" />Payment Info</a> </li> */}
                      <li> <a className="dropdown-item" href="student-bookmark.html"><i className="fas bi-cart-check-fill fa-fw me-1" />Wishlist</a> </li>
                    </ul>
                  </li>
                  <li> <a className="dropdown-item" href="#"><i className="fas fa-user-cog fa-fw me-1" />Admin (Coming Soon)</a> </li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li> <a className="dropdown-item" href="instructor-edit-profile.html"><i className="fas fa-fw fa-edit me-1" />Edit Profile</a> </li>
                  <li> <a className="dropdown-item" href="instructor-setting.html"><i className="fas fa-fw fa-cog me-1" />Settings</a> </li>
                  <li> <a className="dropdown-item" href="instructor-delete-account.html"><i className="fas fa-fw fa-trash-alt me-1" />Delete Profile</a> </li>
                </ul>
              </li>
              {/* Nav item 4 Megamenu*/}
              <li className="nav-item dropdown dropdown-fullwidth">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Megamenu</a>
                <div className="dropdown-menu dropdown-menu-end pb-0" data-bs-popper="none">
                  <div className="row p-4 g-4">
                    {/* Dropdown column item */}
                    <div className="col-xl-6 col-xxl-3">
                      <h6 className="mb-0">Get started</h6>
                      <hr />
                      <ul className="list-unstyled">
                        <li> <a className="dropdown-item" href="#">Market research</a> </li>
                        <li> <a className="dropdown-item" href="#">Advertising</a> </li>
                        <li> <a className="dropdown-item" href="#">Consumer behavior</a> </li>
                        <li> <a className="dropdown-item" href="#">Digital marketing</a> </li>
                        <li> <a className="dropdown-item" href="#">Marketing ethics</a> </li>
                        <li> <a className="dropdown-item" href="#">Social media marketing</a> </li>
                        <li> <a className="dropdown-item" href="#">Public relations</a> </li>
                        <li> <a className="dropdown-item" href="#">Advertising</a> </li>
                        <li> <a className="dropdown-item" href="#">Decision science</a> </li>
                        <li> <a className="dropdown-item" href="#">SEO</a> </li>
                        <li> <a className="dropdown-item" href="#">Business marketing</a> </li>
                      </ul>
                    </div>
                    {/* Dropdown column item */}
                    <div className="col-xl-6 col-xxl-3">
                      <h6 className="mb-0">Degree</h6>
                      <hr />
                      {/* Dropdown item */}
                      <div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
                        <a className="stretched-link h6 mb-0" href="#">Contact management</a>
                        <p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
                      </div>
                      {/* Dropdown item */}
                      <div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
                        <a className="stretched-link h6 mb-0" href="#">Sales pipeline</a>
                        <p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
                      </div>
                      {/* Dropdown item */}
                      <div className="mb-2 position-relative bg-primary-soft-hover rounded-2 transition-base p-3">
                        <a className="stretched-link h6 mb-0" href="#">Security &amp; Permission</a>
                        <p className="mb-0 small text-truncate-2">Speedily say has suitable disposal add boy. On forth doubt miles of child.</p>
                      </div>
                    </div>
                    {/* Dropdown column item */}
                    <div className="col-xl-6 col-xxl-3">
                      <h6 className="mb-0">Certificate</h6>
                      <hr />
                      {/* Dropdown item */}
                      <div className="d-flex mb-4 position-relative">
                        <h2 className="mb-0"><i className="fab fa-fw fa-google text-google-icon" /></h2>
                        <div className="ms-2">
                          <a className="stretched-link h6 mb-0" href="#">Google SEO certificate</a>
                          <p className="mb-0 small">No prerequisites</p>
                        </div>
                      </div>
                      {/* Dropdown item */}
                      <div className="d-flex mb-4 position-relative">
                        <h2 className="mb-0"><i className="fab fa-fw fa-linkedin-in text-linkedin" /></h2>
                        <div className="ms-2">
                          <a className="stretched-link h6 mb-0" href="#">Business Development Executive(BDE)</a>
                          <p className="mb-0 small">No prerequisites</p>
                        </div>
                      </div>
                      {/* Dropdown item */}
                      <div className="d-flex mb-4 position-relative">
                        <h2 className="mb-0"><i className="fab fa-fw fa-facebook text-facebook" /></h2>
                        <div className="ms-2">
                          <a className="stretched-link h6 mb-0" href="#">Facebook social media marketing</a>
                          <p className="mb-0 small">Expert advice</p>
                        </div>
                      </div>
                      {/* Dropdown item */}
                      <div className="d-flex mb-4 position-relative">
                        <h2 className="mb-0"><i className="fas fa-fw fa-basketball-ball text-dribbble" /></h2>
                        <div className="ms-2">
                          <a className="stretched-link h6 mb-0" href="#">Creative graphics design</a>
                          <p className="mb-0 small">No prerequisites</p>
                        </div>
                      </div>
                    </div>
                    {/* Dropdown column item */}
                    <div className="col-xl-6 col-xxl-3">
                      <h6 className="mb-0">Download Eduport</h6>
                      <hr />
                      {/* Image */}
                      <img src="assets/images/element/14.svg" alt />
                      {/* Download button */}
                      <div className="row g-2 justify-content-center mt-3">
                        {/* Google play store button */}
                        <div className="col-6 col-sm-4 col-xxl-6">
                          <a href="#"> <img src="assets/images/client/google-play.svg" className="btn-transition" alt="google-store" /> </a>
                        </div>
                        {/* App store button */}
                        <div className="col-6 col-sm-4 col-xxl-6">
                          <a href="#"> <img src="assets/images/client/app-store.svg" className="btn-transition" alt="app-store" /> </a>
                        </div>
                      </div>
                    </div>
                    {/* Action box */}
                    <div className="col-12">
                      <div className="alert alert-success alert-dismissible fade show mt-2 mb-0 rounded-3" role="alert">
                        {/* Avatar */}
                        <div className="avatar avatar-xs me-2">
                          <img className="avatar-img rounded-circle" src="assets/images/avatar/09.jpg" alt="avatar" />
                        </div>
                        {/* Info */}
                        The personality development class starts at 2:00 pm, click to <a href="#" className="alert-link">Join Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {/* Nav item 5 link*/}
              <li className="nav-item dropdown">
                <a className="nav-link" href="#" id="advanceMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-ellipsis-h" />
                </a>
                <ul className="dropdown-menu dropdown-menu-end min-w-auto" data-bs-popper="none">
                  <li>
                    <a className="dropdown-item" href="https://support.webestica.com/" target="_blank">
                      <i className="text-warning fa-fw bi bi-life-preserver me-2" />Support
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="docs/index.html" target="_blank">
                      <i className="text-danger fa-fw bi bi-card-text me-2" />Documentation
                    </a>
                  </li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="https://eduport.webestica.com/rtl/" target="_blank">
                      <i className="text-info fa-fw bi bi-toggle-off me-2" />RTL demo
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="https://themes.getbootstrap.com/store/webestica/" target="_blank">
                      <i className="text-success fa-fw bi bi-cloud-download-fill me-2" />Buy Eduport!
                    </a>
                  </li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="docs/alerts.html" target="_blank">
                      <i className="text-orange fa-fw bi bi-puzzle-fill me-2" />Components
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Nav Main menu END */}
            {/* Nav Search START */}
            <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
              <div className="nav-item w-100">
                <form className="position-relative">
                  <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 " /></button>
                </form>
              </div>
            </div>
            {/* Nav Search END */}
          </div>
          {/* Main navbar END */}
          {/* Profile START */}
          <div className="dropdown ms-1 ms-lg-0">
            <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" />
            </a>
            <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
              {/* Profile info */}
              <li className="px-3">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="avatar me-3">
                    <img className="avatar-img rounded-circle shadow" src="assets/images/avatar/01.jpg" alt="avatar" />
                  </div>
                  <div>
                    <a className="h6" href="#">Lori Ferguson</a>
                    <p className="small m-0">example@gmail.com</p>
                  </div>
                </div>
                <hr />
              </li>
              {/* Links */}
              <li><a className="dropdown-item" href="#"><i className="bi bi-person fa-fw me-2" />Edit Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="bi bi-gear fa-fw me-2" />Account Settings</a></li>
              <li><a className="dropdown-item" href="#"><i className="bi bi-info-circle fa-fw me-2" />Help</a></li>

              {/* logic for display sigin and signout after signin */}
              {
                auth.user && auth.user.role === 'user' ?
                  <li><a href="#" className="dropdown-item bg-danger-soft-hover" onClick={() => dispatch(logoutuser(auth.user))}><i className="bi bi-power fa-fw me-2" />Sign Out</a></li>
                  :
                  <li><NavLink to={"/Auth"} className="dropdown-item" href="#"><i class="bi bi-box-arrow-in-right me-2"></i>Sign In</NavLink></li>
              }

              {
                auth.user && auth.user.role === 'instructore' ?
                  <li><a href="#" className="dropdown-item bg-danger-soft-hover" onClick={() => dispatch(logoutuser(auth.user))}><i className="bi bi-power fa-fw me-2" />Sign Out</a></li>
                  :
                  <li><NavLink to={"/Auth/instructore"} className="dropdown-item" href="#"><i class="bi bi-box-arrow-in-right me-2"></i>Instructore SignIn</NavLink></li>
              }

              <li> <hr className="dropdown-divider" /></li>
              {/* Dark mode switch START */}
              {/* <li>
                <div className="modeswitch-wrap" id="darkModeSwitch">
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                  />
                  <span>Dark mode</span>
                </div>
              </li> */}
              {/* Dark mode switch END */}
            </ul>
          </div>
          {/* Profile START */}
        </div>
      </nav >
      {/* Logo Nav END */}
    </header >

  );
}

export default Header;