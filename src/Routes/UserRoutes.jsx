import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Home from '../container/Home/Home';

import About from '../container/About/About';
import RequsetDemo from '../container/Requsetdemo/RequsetDemo';
import BookClass from '../container/Bookclass/BookClass';
import RequestAccess from '../container/Requestaccess/RequestAccess';
import AdmissionForm from '../container/Admissionform/AdmissionForm';
import CourseGridClassic from '../container/CourseGridClassic/CourseGridClassic';
import CourseGridMinimal from '../container/CourseGridMinimal/CourseGridMinimal';
import CourseListClassic from '../container/CourseListClassic/CourseListClassic';
import CourseListMinimal from '../container/CourseListMinimal/CourseListMinimal';
import CourseDetailClassic from '../container/CourseDetailClassic/CourseDetailClassic';
import CourseDetailMinimal from '../container/CourseDetailMinimal/CourseDetailMinimal';
import CourseDetailAdvance from '../container/CourseDetailAdvance/CourseDetailAdvance';
import CourseScreenVideo from '../container/CourseScreenVideo/CourseScreenVideo';
import ContactUS from '../container/ContactUS/ContactUS';
import BlogGrid from '../container/BlogGrid/BlogGrid';
import BlogMasonry from '../container/BlogMasonry/BlogMasonry';
import BlogDetail from '../container/BlogDetail/BlogDetail';
import Price from '../container/Price/Price';
import Instructorslist from '../components/Instructorslist/Instructorslist';
import InstructorSingle from '../container/InstructorSingle/InstructorSingle';
import BecomeInstructor from '../container/BecomeInstructor/BecomeInstructor';
import SignIn from '../container/SignIn/SignIn';
import SignUp from '../container/SignUp/SignUp';
import ForgetPassword from '../container/ForgetPassword/ForgetPassword';
import FAQ from '../container/FAQ/FAQ';
import Error404 from '../container/Error404/Error404';
import ComingSoon from '../container/ComingSoon/ComingSoon';
import Cart from '../container/Cart/Cart';
import CheckOut from '../container/CheckOut/CheckOut';
import EmptyCart from '../container/EmptyCart/EmptyCart';
import Wishlist from '../container/Wishlist/Wishlist';
import Courses from '../container/Courses/Courses';
import InstructorDashboard from '../container/InstructorDashboard/InstructorDashboard';
import CreateCourse from '../container/CreateCourse/CreateCourse';
import AddCourse from '../container/AddCourse/AddCourse';
import InstructorEarning from '../container/InstructorEarning/InstructorEarning';
import InstructorStudentlist from '../container/InstructorStudentlist/InstructorStudentlist';
import InstructorOrder from '../container/InstructorOrder/InstructorOrder';
import InstructorReview from '../container/InstructorReview/InstructorReview';
import InstructorPayout from '../container/InstructorPayout/InstructorPayout';
import StudentDashboard from '../container/StudentDashboard/StudentDashboard';
import StudentSubscription from '../container/StudentSubscription/StudentSubscription';
import StudentCourseList from '../container/StudentCourseList/StudentCourseList';
import StudentPaymentInfo from '../container/StudentPaymentInfo/StudentPaymentInfo';
import PrivateRoutes from './PrivateRoutes';
import CategorySingal from '../container/CategorySingal/CategorySingal';

function UserRoutes(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/about/:id' element={<About />} />
                <Route path='/requestdemo' element={<RequsetDemo />} />
                <Route path='/bookclass' element={<BookClass />} />
                <Route path='/requestaccess' element={<RequestAccess />} />
                <Route path='/admissionform' element={<AdmissionForm />} />
                <Route path='/coursegridclassic' element={<CourseGridClassic />} />
                <Route path='/coursegridminimal' element={<CourseGridMinimal />} />
                <Route path='/courselistclassic' element={<CourseListClassic />} />
                <Route path='/courselistminimal' element={<CourseListMinimal />} />
                <Route path='/coursedetailclassic' element={<CourseDetailClassic />} />
                <Route path='/coursedetailminimal' element={<CourseDetailMinimal />} />
                <Route path='/coursedetailadvance' element={<CourseDetailAdvance />} />
                <Route path='/coursescreenvideo' element={<CourseScreenVideo />} />
                <Route path='/contactus' element={<ContactUS />} />
                <Route path='/bloggrid' element={<BlogGrid />} />
                <Route path='/blogmasonry' element={<BlogMasonry />} />
                <Route path='/blogdetail' element={<BlogDetail />} />
                <Route path='/price' element={<Price />} />
                <Route path='/instructorlist' element={<Instructorslist />} />
                <Route path='/instructorsinglet' element={<InstructorSingle />} />
                <Route path='/becomeinstructor' element={<BecomeInstructor />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path='/error404' element={<Error404 />} />
                <Route path='/comingsoon' element={<ComingSoon />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/emptycart' element={<EmptyCart />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/instructordashboard' element={<InstructorDashboard />} />
                <Route path='/instructorcourses' element={<Courses />} />
                <Route path='/createcourse' element={<CreateCourse />} />
                <Route path='/addcourse' element={<AddCourse />} />
                <Route path='/earnings' element={<InstructorEarning />} />
                <Route path='/studentlist' element={<InstructorStudentlist />} />
                <Route path='/orders' element={<InstructorOrder />} />
                <Route path='/review' element={<InstructorReview />} />
                <Route path='/payout' element={<InstructorPayout />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/studentdashboard' element={<StudentDashboard />} />
                </Route>
                <Route path='/studentsubscriptions' element={<StudentSubscription />} />
                <Route path='/studentdcourses' element={<StudentCourseList />} />
                <Route path='/studentpaymentinfo' element={<StudentPaymentInfo />} />
                <Route path='/CategorySingal/:id' element={<CategorySingal />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;