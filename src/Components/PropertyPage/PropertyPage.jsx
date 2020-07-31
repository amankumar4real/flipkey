import React from 'react'
import { connect } from 'react-redux'
import { getPropertyData } from '../../redux/Common/action'
import { afterPropData, getRecommendations, recomData, changeEndDate, changeStartDate, changePrice, guestDays, availableDates, reviewSubmission } from '../../redux/PropertyDetails/action'
// import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { Dropdown, Button, ButtonGroup, Form, FormCheck, Table, Popover } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
// import '@brainhubeu/react-carousel/lib/style.css';
import { faDivide } from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from 'react-google-login';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { moment } from "react-datepicker";
import * as Icons from 'react-bootstrap-icons';
import Calendar from 'react-calendar'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Googlemap from "./GoogleMap"
import './PropertyPage.css';
import Faq from '../common/FAQ/faq';

class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: 0,
            people: 1,
            adult: 1,
            child: 0,
            startDate: new Date(),
            endDate: new Date(),
            toggle: false,
            id: null,
            days: 1,
            enableBookButton: true
        }

    }

    handleBooking = p => {
        this.props.changeStartDate(this.state.startDate)
        this.props.changeEndDate(this.state.endDate)
        this.props.changePrice((p * this.state.days * this.state.people) + (Math.round((this.state.days * p * this.state.people) * 0.1)) + 60 + 60 + 60)
        this.props.guestDays({ guest: this.state.people, days: this.state.days })
        this.props.history.push(`/results/booking/${this.props.match.params.id}`)
    }

    // componentWillMount() {
    //     localStorage.getItem('startDate') && this.setState({
    //         startDate: new Date(parseInt(localStorage.getItem('startDate'))),
    //         endDate: new Date(parseInt(localStorage.getItem('endDate')))

    //     })
    // }

    //Axios call for 
    componentDidMount() {
        // this.setState({
        //     price : this.props.data.property_data[0].price
        // })
        console.log(this.props.match.params.id)
        this.props.afterPropData(this.props.match.params)
        this.props.getRecommendations(this.props.match.params)
        this.props.availableDates({ property_id: Number(this.props.match.params.id) })
    }


    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem('startDate',+new JSON.stringify(nextState.startDate));
    //     localStorage.setItem('endDate',+new JSON.stringify(nextState.endDate));
    // }

    //function for submitting review
    submitReview = () => {
        const payload = {
            property_id: Number(this.props.match.params.id),
            title: this.state.title,
            rating: Number(this.state.rating),
            review: this.state.description,
            token: this.props.token
        }
        if(payload.title && payload.rating && payload.review){
            this.props.reviewSubmission(payload)
        }
        else{
            this.props.reviewSubmission(payload)
            alert('Please fill all the feils')
        }
        console.log(payload, this.props.token)
        
    }

    checkBookingAvailable = (s, e) => {
        const checkDates = this.props.datesFromR.data
        console.log(s, e, checkDates)
        for (var i = 0; i < checkDates.length; i++) {
            var s1 = checkDates[i][0].split("-").map(val => Number(val))
            var e1 = checkDates[i][1].split("-").map(val => Number(val))
            if (!((new Date(`${s[1]}/${s[0]}/${s[2]}`) <= new Date(`${s1[1]}/${s1[2]}/${s1[0]}`) && new Date(`${e[1]}/${e[0]}/${e[2]}`) <= new Date(`${s1[1]}/${s1[2]}/${s1[0]}`)) || ((new Date(`${s[1]}/${s[0]}/${s[2]}`) >= new Date(`${e1[1]}/${e1[2]}/${e1[0]}`)) && (new Date(`${e[1]}/${e[0]}/${e[2]}`) >= new Date(`${e1[1]}/${e1[2]}/${e1[0]}`))))) {
                console.log(1)
                return false
            }
            console.log(s, e, s1, e1)
            // console.log(new Date(`${s[1]}/${s[0]}/${s[2]}`),new Date(`${s1[1]}/${s1[2]}/${s1[0]}`), new Date(`${e[1]}/${e[0]}/${e[2]}`) , new Date(`${e1[1]}/${e1[2]}/${e1[0]}`))
        }
        console.log(0)
        return true
        // console.log(s,e,s1,e1)
    }
    calculateDays = date => {
        date = date.toString()
        date = date.split(" ")
        date.shift()
        let mon = date.shift()
        if (mon == "Jan") {
            mon = "01"
        }
        else if (mon == "Feb") {
            mon = "02"
        }
        else if (mon == "Mar") {
            mon = "03"
        }
        else if (mon == "Apr") {
            mon = "04"
        }
        else if (mon == "May") {
            mon = "05"
        }
        else if (mon == "Jun") {
            mon = "06"
        }
        else if (mon == "Jul") {
            mon = "07"
        }
        else if (mon == "Aug") {
            mon = "08"
        }
        else if (mon == "Sep") {
            mon = "09"
        }
        else if (mon == "Oct") {
            mon = "10"
        }
        else if (mon == "Nov") {
            mon = "11"
        }
        else {
            mon = "12"
        }
        let day = date.shift()
        let year = date.shift()
        return [day, mon, year]
    }
    handleStartDate = date => {
        if (date > this.state.endDate) {
            this.setState({
                endDate: date
            })
            this.setState({
                days: 1
            })
            let s = this.calculateDays(date)
            let e = this.calculateDays(date)
            s = s.map(val => Number(val))
            e = e.map(val => Number(val))
            if (this.checkBookingAvailable(s, e)) {
                this.setState({
                    enableBookButton: true
                })
            } else {
                this.setState({
                    enableBookButton: false
                })
            }

        }
        else {
            this.setState({
                startDate: date,
            });
            let s = this.calculateDays(date)
            let e = this.calculateDays(this.state.endDate)
            s = s.map(val => Number(val))
            e = e.map(val => Number(val))

            if (this.checkBookingAvailable(s, e)) {
                this.setState({
                    enableBookButton: true
                })
            } else {
                this.setState({
                    enableBookButton: false
                })
            }


            if (s[2] - e[2] == 0) {
                if (e[1] - s[1] == 0) {
                    if (e[0] - s[0] == 0) {
                        this.setState({
                            days: 1
                        })
                    }
                    else {
                        this.setState({
                            days: e[0] - s[0] + 1
                        })
                    }
                }
                else {
                    if (e[1] - s[1] == 1) {
                        this.setState({
                            days: 31 - s[0] + 1 + e[0]
                        })
                    }
                    else {
                        this.setState({
                            days: 31 - s[0] + e[1] - s[1] + e[0]
                        })
                    }
                }
            }
        }
        this.setState({
            startDate: date,
        });
        console.log(this.state.days)
    };
    handleEndDate = date => {
        // if(this.state.startDate){
        console.log(date)
        if (this.state.startDate > date) {
            this.setState({
                startDate: date
            })
            this.setState({
                days: 1
            })
            let s = this.calculateDays(date)
            let e = this.calculateDays(date)
            s = s.map(val => Number(val))
            e = e.map(val => Number(val))
            if (this.checkBookingAvailable(s, e)) {
                this.setState({
                    enableBookButton: true
                })
            } else {
                this.setState({
                    enableBookButton: false
                })
            }
        }
        else {
            this.setState({
                endDate: date,
            });
            let s = this.calculateDays(this.state.startDate)
            let e = this.calculateDays(date)
            s = s.map(val => Number(val))
            e = e.map(val => Number(val))

            if (this.checkBookingAvailable(s, e)) {
                this.setState({
                    enableBookButton: true
                })
            } else {
                this.setState({
                    enableBookButton: false
                })
            }

            // console.log(s, e)
            if (e[2] - s[2] == 0) {
                if (e[1] - s[1] == 0) {
                    if (e[0] - s[0] == 0) {
                        this.setState({
                            days: 1
                        })
                    }
                    else {
                        this.setState({
                            days: e[0] - s[0] + 1
                        })
                    }
                }
                else {
                    if (e[1] - s[1] == 1) {
                        this.setState({
                            days: 31 - s[0] + 1 + e[0]
                        })
                    }
                    else {
                        this.setState({
                            days: 31 - s[0] + e[1] - s[1] + e[0]
                        })
                    }
                }
            }
        }
        this.setState({
            endDate: date,
        });
        console.log(this.state.days)
    };

    adultInc = () => {

        this.setState({
            adult: this.state.adult + 1,
            people: this.state.people + 1
        })
        console.log(this.state.adult)
    }
    adultDec = () => {
        if (this.state.adult > 1) {

            this.setState({
                adult: this.state.adult - 1,
                people: this.state.people - 1
            })
            console.log(this.state.adult)
        }
    }
    childInc = () => {
        this.setState({
            child: this.state.child + 1,
            people: this.state.people + 1
        })
        console.log(this.state.child)
    }
    childDec = () => {
        if (this.state.child > 0) {

            this.setState({
                child: this.state.child - 1,
                people: this.state.people - 1
            })
            console.log(this.state.child)
        }
    }
    handleRecom = (newId) => {

        // this.setState({id:newId})
        this.props.history.push(`/results/${newId}`)
        window.location.reload(false)
    }

    render() {
        const { toggle } = this.state
        console.log(this.props)
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        //took data from props reducer
        var data = this.props.data
        const dataR = this.props.recom

        var available = ""
        var recData
        var argPassDayPick = [{ before: new Date() }]
        var argPassDatePick = []

        if (Object.keys(this.props.datesFromR).length != 0) {
            available = this.props.datesFromR.data
            for (var i = 0; i < available.length; i++) {
                const checkIn = available[i][0].split("-").map(val => Number(val))
                const checkOut = available[i][1].split("-").map(val => Number(val))
                argPassDayPick.push({ after: new Date(checkIn[0], checkIn[1] - 1, checkIn[2] - 1), before: new Date(checkOut[0], checkOut[1] - 1, checkOut[2] + 1) })
            }

            for (var i = 0; i < available.length; i++) {
                const checkIn = available[i][0].split("-").map(val => Number(val))
                const checkOut = available[i][1].split("-").map(val => Number(val))
                console.log(`${checkIn[1]}/${checkIn[2]}/${checkIn[0]}`)
                console.log(`${checkOut[1]}/${checkOut[2]}/${checkOut[0]}`)
                while (checkIn[1] <= checkOut[1]) {
                    while (checkIn[2] < checkOut[2]) {
                        argPassDatePick.push(new Date(`${checkIn[1]}/${checkIn[2] + 1}/${checkIn[0]}`))
                        checkIn[2]++
                    }
                    while (checkOut[2] < checkOut[2]) {
                        argPassDatePick.push(new Date(`${checkIn[1]}/${checkIn[2] + 1}/${checkIn[0]}`))
                        checkOut[2]++
                    }
                    checkIn[1]++
                }
            }

        }
        if (Object.keys(dataR).length != 0) {
            recData = dataR.data
            console.log("req ata")
            console.log(recData)
        }

        // this if condition checks the data isloaded or not

        //this variables are defines outside because of axios post call
        //this if condition is to check whether the page loaded and do all the calculations after  that
        var amenities, dispAmenitites, price, property, suitability, owner, review, i, tot, avg, obj, a, obj_percent
        if (Object.keys(data).length != 0) {
            amenities = data.property_amenities[0]
            dispAmenitites = []
            for (var key in amenities) {
                if (amenities[key] == "true") {
                    dispAmenitites.push(key)
                }
            }
            property = data.property_data
            price = property[0].price
            console.log(price)
            suitability = data.property_suitability
            owner = data.property_owner
            review = data.property_review
            console.log('reaviews')
            console.log(review)
            tot = 0
            obj = [{ "0": 0 }, { "1": 0 }, { "2": 0 }, { "3": 0 }, { "4": 0 }, { "5": 0 }]
            review.map((item, ind) => {
                tot += item.rating
                if (item.rating == ind) {
                    obj[ind][ind]++
                }
                if (item.rating == 1) {
                    obj[1][1]++
                }
                if (item.rating == 2) {
                    obj[2][2]++
                }
                if (item.rating == 3) {
                    obj[3][3]++
                }
                if (item.rating == 4) {
                    obj[4][4]++
                }
                if (item.rating == 5) {
                    obj[5][5]++
                }

            })

            // console.log(obj)
            avg = Math.floor(tot / review.length)

            obj_percent = [
                { "0": Math.ceil((obj[0][0] / review.length) * 100) },
                { "1": Math.ceil((obj[1][1] / review.length) * 100) },
                { "2": Math.ceil((obj[2][2] / review.length) * 100) },
                { "3": Math.ceil((obj[3][3] / review.length) * 100) },
                { "4": Math.ceil((obj[4][4] / review.length) * 100) },
                { "5": Math.ceil((obj[5][5] / review.length) * 100) }
            ]
            a = []
            for (var i = 0; i <= 5; i++) {
                a.push(Math.floor(obj_percent[i][i] * 80 / 100) + "px")
            }
        }



        console.log(a, avg)
        return (
            Object.keys(data).length != 0 ?
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 " >
                                <Carousel
                                    swipeable={false}
                                    draggable={false}
                                    showDots={false}
                                    responsive={responsive}
                                    ssr={false} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={false}
                                    autoPlaySpeed={0}
                                    keyBoardControl={true}
                                    customTransition="all 1"
                                    transitionDuration={1000}
                                    containerclassName="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    deviceType={this.props.desktop}
                                    dotListclassName="custom-dot-list-style"
                                    itemclassName="carousel-item-padding-100-px"
                                >
                                    <img src={property[0].image_a} width={400} height={400} className='pr-2 w-100'/>
                                    <img src={property[0].image_b} width={400} height={400} className='pr-2 w-100'/>
                                    <img src={property[0].image_c} width={400} height={400} className='pr-2 w-100'/>
                                    <img src={property[0].image_d} width={400} height={400} className='pr-2 w-100'/>
                                    <img src={property[0].image_a} width={400} height={400} className='pr-2 w-100'/>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 container">
                        <div className="row">
                            <div className="col-xl-8 pb-5 pt-5 col-md-12" >
                                <nav id="navbar-example2" className="navbar navbar-light bg-light sticky-top">
                                    <ul className="nav nav-pills active">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Description.">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Map">Maps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Availability">Availablity</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#Reviews">Reviews</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#FAQs">FAQs</a>
                                        </li>
                                    </ul>
                                </nav>
                                <ul data-spy="scroll" data-target="#navbar-example2" data-offset="0" className="list-group list-group-flush">
                                    {/* property name */}
                                    <li id="Description." className="list-group-item">
                                        <p className="mb-0" style={{ fontSize: 30 }}>The Perfect gateway for family an friends in</p>
                                        <p style={{ fontSize: 30 }}>{property[0].name}</p>
                                    </li>
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <div className="mb-4">
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{ background: "#f5f8f9" }}>
                                                <strong> <Icons.House className='mx-2' size={20} />{property[0].type}</strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{ background: "#f5f8f9" }}>
                                                <Icons.DashSquare className='mx-2' size={20} />
                                                <strong>{property[0].bed} Bedroom </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{ background: "#f5f8f9" }}>
                                                <strong> <Icons.People size={20} /> Sleeps {property[0].no_people}  </strong></span>
                                            <span className="badge badge-pill badge-light p-3 mr-5" style={{ background: "#f5f8f9" }}>
                                                <strong><Icons.Calendar4 size={20} className='mx-2' /> 7 days</strong></span>
                                        </div>
                                        {/* BOOK WITH CONFIDENCE */}
                                        <div className="mb-4">
                                            <p className="h5" style={{ color: '#00af87' }}>
                                                BOOK WITH CONFIDENCE.
                                            </p>
                                            {/* redirect to help page */}
                                            {/* <Link to='/'> */}
                                            <p className="" style={{ color: '#00af87' }}>
                                                Pay on FlipKey to get Payment Protection for this rental. Never pay by bank or wire transfer.
                                            </p>
                                            {/* </Link> */}
                                        </div>
                                    </li>
                                    {/* Key info */}
                                    <div className="mb-4">
                                        <p style={{ fontWeight: 600 }} >
                                            KEY INFO
                                            </p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />
                                                    {dispAmenitites[0]}
                                                </div>
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />
                                                    {dispAmenitites[5]}
                                                </div>
                                            </div>
                                        </div>
                                        {suitability[0].parking && suitability[0].elevator ?
                                            <div className='container'>
                                                <div className="row justify-contnent-between">
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2' />
                                                        Parking Available
                                                    </div>
                                                    <div className='col-6'>
                                                        <Icons.CheckCircle size={15} className='mx-2' />
                                                        Elevator Available
                                                    </div>
                                                </div>
                                            </div>
                                            : suitability[0].parking && suitability[0].wheelchair ?
                                                <div className='container'>
                                                    <div className="row justify-contnent-between">
                                                        <div className='col-6'>
                                                            <Icons.CheckCircle size={15} className='mx-2' />
                                                            Parking Available
                                                        </div>
                                                        <div className='col-6'>
                                                            <Icons.CheckCircle size={15} className='mx-2' />
                                                            wheelchair
                                                        </div>
                                                    </div>
                                                </div>
                                                : suitability[0].parking ?
                                                    <div className='container'>
                                                        <div className="row justify-contnent-between">
                                                            <div className='col-6'><Icons.CheckCircle size={15} className='mx-2' />Parking Available</div>
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2' /> No wheel chair</div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='container'>
                                                        <div className="row justify-contnent-between">
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2' />Parking Not Available</div>
                                                            <div className='col-6'><Icons.XCircle size={15} className='mx-2' /> No wheel chair</div>
                                                        </div>
                                                    </div>
                                        }
                                    </div>
                                    {/* Description of the owner */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <div>
                                            <p className="mb-2 lead" style={{ fontWeight: 400 }}>Description from owner</p>
                                            <p className='text-muted' style={{ fontSize: 15 }}>
                                                This one-bedroom deluxe King Bed Villa is adjacent to the Great Smoky Mountain National
                                                Park.It exquisitely decorated and accommodates 4 guest comfortably (780 square feet) .
                                                This villa is in the heart of the Smoky Mountains. The resort has so much to offer. Some
                                                of the most popular attractions at the resort include Wild Bear Falls (the indoor
                                                waterpark), award winning restaurants, Serenity Spa and horse back riding! Your stay at
                                                the resort is sure to be an unforgettable vacation!
                                            </p>
                                        </div>
                                    </li>
                                    {/* Families */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p style={{ fontWeight: 600 }} >FAMILIES</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    {suitability[0].children ?
                                                        <div> <Icons.CheckCircle size={15} className='mx-2' />
                                                            Great place for children
                                                    </div>
                                                        : <div> <Icons.XCircle size={15} className='mx-2' />Not suitablefor children</div>
                                                    }
                                                </div>
                                                <div className='col-6'>
                                                    {suitability[0].pets ?
                                                        <div><Icons.CheckCircle size={15} className='mx-2' />
                                                            Pets are allowed </div>
                                                        : <div> <Icons.XCircle size={15} className='mx-2' />No pets allowed</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* Beds and Bathrooms */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p style={{ fontWeight: 600 }}>BED & BATHROOM</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />{property[0].bed} Beds Available
                                                </div>
                                                <div className='col-6'>
                                                    <Icons.CheckCircle size={15} className='mx-2' />{property[0].bath} Beds Available
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* amenities */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p style={{ fontWeight: 600 }}>AMENITIES</p>
                                        <div className='container'>
                                            <div className="row justify-contnent-between">
                                                {
                                                    dispAmenitites.map((item, ind) => (
                                                        <div className='col-6' key={ind}>
                                                            {item === 'tv' ?
                                                                <Icons.Tv size={15} className='mx-2' /> : <Icons.CheckCircle size={15} className='mx-2' />}
                                                            {item}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </li>
                                    {/* Access */}
                                    <li id="Description" className="list-group-item ml-0 pl-0">
                                        <p style={{ fontWeight: 600 }}>ACCESS</p>
                                        {
                                            suitability[0].parking && suitability[0].elevator ?
                                                <div className='container'>
                                                    <div className="row justify-contnent-between">
                                                        <div className='col-6'>
                                                            <img className='mx-2' src="https://img.icons8.com/dotty/80/000000/car.png" width='25px' />
                                                            Parking Available
                                                </div>
                                                        <div className='col-6'>
                                                            <Icons.CheckCircle size={15} className='mx-2' />
                                                            Elevator Available
                                                </div>
                                                    </div>
                                                </div>
                                                : suitability[0].parking && suitability[0].wheelchair ?
                                                    <div className='container'>
                                                        <div className='col-6'> <Icons.XCircle size={15} className='mx-2' />Parking Available</div>
                                                        <div className='col-6'><Icons.XCircle size={15} className='mx-2' /> wheelchair</div>
                                                    </div>
                                                    : suitability[0].parking ?
                                                        <div className='container'>
                                                            <div className='col-6'> <Icons.XCircle size={15} className='mx-2' />Parking Available</div>
                                                            <div className='col-6'> No wheel chair</div>
                                                        </div>
                                                        : <div className='container'>
                                                            <div className="col-6"> <Icons.CheckCircle size={15} className='mx-2' />Parking Not Available</div>
                                                            <div className="col-6"><Icons.CheckCircle size={15} className='mx-2' /> No wheel chair</div>
                                                        </div>
                                        }
                                        <hr />
                                        {/* interaction witn guest */}
                                        <div>
                                            <p style={{ fontWeight: 600 }}>INTERACTION WITH GUEST</p>
                                            <div className='d-flex justify-content-around'>
                                                <div className=''>
                                                    <img src="https://img.icons8.com/dotty/80/000000/headset.png" width="25px" />
                                                </div>
                                                <div className='pl-2' style={{ fontSize: 15 }}>
                                                    Detailed check-in and orientation information are emailed to guests prior to
                                                    arrival - please review carefully to avoid delays at check-in. Guests should
                                                    text/call the building manager prior to their departure to establish contact.
                                                    The building manager will provide guests with access to the apartment upon arrival.
                                                    Guests may contact building manager should any issues arise during their stay.
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </li>
                                    {/* policies */}
                                    <div>
                                        <p style={{ fontWeight: 600 }}>POLICIES</p>
                                        <div className='d-flex justify-content-around'>
                                            <div className=''>
                                                <img src="https://img.icons8.com/ios/50/000000/check-file.png" width='25' />
                                            </div>
                                            <div>
                                                <dl>
                                                    <dd className='pl-2'>
                                                        <strong>Check in time:</strong> 14:00, <strong>Check out time:</strong> 11:00
                                                    </dd>
                                                    <dd className='pl-2'>
                                                        If you have any questions about check-in or check-out times, please contact the owner/manager.
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='row ml-1'>
                                            <Icons.CreditCard size={30} className='pr-2' />
                                            <p className='mb-0' style={{ fontWeight: 600 }}>Payment</p>
                                            <p className='pl-4'>
                                                This rental can only be paid for online through FlipKey using your credit/debit card or
                                                PayPal (never by bank or wire transfer).
                                            </p >
                                            <p className='pl-4'>Damage deposit: $300.00</p>
                                        </div>
                                        <div className='row ml-1'>
                                            <Icons.XCircle size={30} className='pr-2' />
                                            <p className='mb-0' style={{ fontWeight: 600 }}>Smoking</p>
                                        </div>
                                        <p className='pl-4 mt-0'>No smoking at this property</p>
                                        <hr />
                                    </div>
                                    {/* CANCELLATIONS policy */}
                                    <div>
                                        <p style={{ fontWeight: 600 }}>CANCELLATIONS</p>
                                        <p>Change of plans? No problem. You could receive a partial or full refund, depending on when you cancel.</p>
                                        <Table className='border-0'>
                                            <tbody>
                                                <tr>
                                                    <td ><p style={{ top: -20, position: 'relative' }}>Booking confirmed</p></td>
                                                    <td>
                                                        {/* bullete point */}
                                                        <ul>
                                                            <li style={{ listStyleType: 'disc', top: -20, position: 'relative' }}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-1 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{ width: '100%', top: -10, left: -10, position: 'relative', background: '#1fa1db' }}>
                                                            <strong> 100% refund </strong>within 24 hours after booking (provided the stay is at least 60 days away).
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><p style={{ top: -20, position: 'relative' }}><strong>24 </strong>hours after <br />booking</p></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{ listStyleType: 'disc', top: -20, position: 'relative' }}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-2 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{ width: '100%', top: -10, left: -10, position: 'relative', background: '#8ed0ec' }}>
                                                            <strong> 50% refund </strong>of the amount paid (minus the booking fee*) if cancelled at least 4 weeks before check-in.
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><p><strong>4</strong> weeks before</p></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{ listStyleType: 'disc', top: -20, position: 'relative' }}></li>
                                                        </ul>
                                                    </td>
                                                    {/* condition-3 */}
                                                    <td>
                                                        <div className='border w-100 p-2' style={{ width: '100%', left: -10, position: 'relative' }}>
                                                            <strong> No refund </strong>if cancelled less than 4 weeks before check-in.
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><p>Check-in date</p></td>
                                                    {/* bullete point */}
                                                    <td>
                                                        <ul>
                                                            <li style={{ listStyleType: 'disc', top: -20, position: 'relative' }}></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <small>* The booking fee is stated in the cancellation policy information on the payment page. This fee helps us run our secure platform and enables us to provide 24/7 customer support</small>
                                        <hr />
                                    </div>
                                    {/* About the owner */}
                                    <div>
                                        <h4 style={{ fontWeight: 400 }}>About the owner</h4>
                                        <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}><strong>{owner[0].name}.</strong></p>
                                        <div style={{ fontSize: 15, fontFamily: " Comic Sans MS, cursive, sans-serif" }}>
                                            <p>Response Rate:<strong>{owner[0].response_rate}%</strong></p>
                                            <p>Years listed : <strong>{owner[0].year_listed}</strong></p>
                                            <p>Contact Info: <strong>{owner[0].phone}</strong></p>
                                            {owner[0].english ? <p>Languages Spoken: English</p> : <p>Languages Spoken: Native</p>}
                                        </div>
                                    </div>
                                    {/* map inegration */}
                                    <li id="Map" className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">Map Integration</h4>
                                        <Googlemap />
                                    </li>
                                    {/* calendar availability */}
                                    <li id="Availability" className="list-group-item ml-0 pl-0">
                                        <h4>Availability</h4>

                                        {
                                            <DayPicker className="DayPicker-Day "
                                                numberOfMonths={12}
                                                initialMonth={new Date(2020, 6, 30)}
                                                disabledDays={argPassDayPick}
                                            />
                                        }

                                    </li>
                                    {/* Reviews page */}
                                    <li className="list-group-item ml-0 pl-0">

                                        <h4 style={{ fontWeight: 400 }}>Reviews</h4>

                                        {
                                            avg >= 4 ? <p><strong style={{ fontSize: 15 }}><i>Very Good</i></strong> – based on {review.length} reviews</p> :
                                                avg >= 3 ? <p><strong>Good </strong> – based on {review.length} reviews</p> :
                                                    avg >= 2 ? <p><strong>Average </strong> – based on {review.length} reviews</p> :
                                                        <p><strong>Worst </strong> – based on {review.length} reviews</p>
                                        }
                                        {/* redirect to add review component */}
                                        {/* write a review button */}
                                        {
                                            this.props.token ?
                                                <div>
                                                    <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                                                        aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header text-center">
                                                                    <h4 class="modal-title w-100 font-weight-bold">Review Form</h4>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body mx-3">
                                                                    <div class="md-form mb-5">
                                                                        <i class="fas fa-envelope prefix grey-text"></i>
                                                                        <label data-error="wrong" data-success="right" className="justify-content" for="defaultForm-email">Review About</label>
                                                                        <input type="text" id="defaultForm-email" class="form-control validate" required onChange={(e) => this.setState({ title: e.target.value })} />

                                                                    </div>
                                                                    <div class="input-group mb-3">
                                                                        <div class="input-group-prepend">
                                                                            <label class="input-group-text" for="inputGroupSelect01">Rate us</label>
                                                                        </div>
                                                                        <select class="custom-select" id="inputGroupSelect01" required onChange={(e) => this.setState({ rating: e.target.value })}>
                                                                            <option selected>Choose...</option>
                                                                            <option value="4">5</option>
                                                                            <option value="5">4</option>
                                                                            <option value="3">3</option>
                                                                            <option value="2">2</option>
                                                                            <option value="1">1</option>
                                                                        </select>
                                                                    </div>
                                                                    <label for="revi" className="justify-content">Please Describe your expeirnce with us</label>
                                                                    <textarea id="revi" required className="form-control validate justify-content w-100" style={{ height: "200px" }} onChange={(e) => this.setState({ description: e.target.value })} >

                                                                    </textarea>

                                                                </div>
                                                                <div class="modal-footer d-flex justify-content-center">
                                                                    <button class="btn btn-default" onClick={this.submitReview} class="close" data-dismiss="modal" aria-label="Close">Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="text-center">
                                                        <a href="" class="btn rounded-0 btn-block text-center border w-50 mr-5" data-toggle="modal" style={{ color: '#066bc8', background: '#f4f4f4' }} data-target="#modalLoginForm">Write a Review</a>
                                                    </div></div> :
                                                <div>
                                                                <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                                                        aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-body mx-3">
                                                                    <div class="md-form mb-5">
                                                                        Please Login to write a review
                                                                    </div>
                                                                </div>
                                                        
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="text-center">
                                                        <a href="" class="btn rounded-0 btn-block text-center border w-50 mr-5" data-toggle="modal" style={{ color: '#066bc8', background: '#f4f4f4' }} data-target="#modalLoginForm">Write a Review</a>
                                                    </div>
                                                </div>


                                        }
                                    </li>

                                    <li id="Reviews" className="list-group-item ml-0 pl-0">
                                        {/* Excellent rating */}
                                        <div className='d-flex justify-content-start my-0'>
                                            <p style={{ width: 100 }}>Excellent</p>
                                            <div
                                                style={{ height: "20px", width: "120px", background: "#f4f4f4" }}>
                                                <div style={{ height: "20px", width: a[5], background: "#00af87" }}></div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[5][5]}</p>
                                        </div>
                                        {/* Very Good rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{ width: 100 }}>Very Good</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4" }}>
                                                    <div style={{ height: "20px", width: a[4], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[4][4]}</p>
                                        </div>
                                        {/* Average rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{ width: 100 }}>Average</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4" }}>
                                                    <div style={{ height: "20px", width: a[3], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[3][3]}</p>
                                        </div>
                                        {/* Poor rating */}
                                        <div className='d-flex justify-content-start my-0 py-0'>
                                            <p style={{ width: 100 }}>Poor</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4" }}>
                                                    <div style={{ height: "20px", width: a[2], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <div className='px-3 text-muted'>{obj[2][2]}</div>
                                        </div>
                                        {/* Terrible */}
                                        <div className='d-flex justify-content-start my-0 py-0' >
                                            <p style={{ width: 100 }}>Terrible</p>
                                            <div>
                                                <div
                                                    style={{ height: "20px", width: "120px", background: "#f4f4f4" }}>
                                                    <div style={{ height: "20px", width: a[1], background: "#00af87" }}></div>
                                                </div>
                                            </div>
                                            <p className='px-3 text-muted'>{obj[1][1]}</p>
                                        </div>
                                    </li>
                                    {/* displaying reviews */}
                                    {
                                        review.map(item =>
                                            (
                                                <li className="list-group-item ml-0 pl-0">
                                                    <div className='d-flex justify-content-start '>
                                                        <div className='mr-2'>
                                                            <img src={item.image} alt='img' width={60} className='rounded-circle border' />
                                                        </div>
                                                        <div className='d-flex flex-column '>
                                                            <p className='lead py-0 mb-0' style={{ fontWeight: 400 }}>"{item.title}!!"</p>
                                                            <div >
                                                                <span className="px-2">
                                                                    {
                                                                        item.rating === 5 ? <img src='/images/rating_5.png' width={100} alt={item.rating} /> 
                                                                        : item.rating ===4 ? <img src='/images/rating_4.png' width={100} alt={item.rating} />
                                                                        :<img src='/images/rating_4.png' width={100} alt={item.rating} />
                                                                    }
                                                                </span>
                                                                <span className="px-2 text-muted" style={{ fontSize: 15 }}>
                                                                    Reviewed {item.rev_date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="my-2">
                                                        {item.review}
                                                    </p>
                                                </li>
                                            )
                                        )
                                    }
                                    <li id="FAQs" className="list-group-item ml-0 pl-0">
                                        <h4 className='text-center'>FAQ</h4>
                                        {/* *********************** FAQ component *********************** */}
                                        <Faq />
                                    </li>
                                    {/* Recommendation */}
                                    <li class="list-group-item ml-0 pl-0">
                                        <h4 style={{ fontWeight: 400 }}>Recommended for you</h4>
                                        <div className="row">
                                            {
                                                recData && recData.map(item => (
                                                    <div className='col-4 p-0 m-0'>
                                                        <div className="card rounded-0 border-0 m-2">
                                                            <img className="img-fluid" src={item.image_a} height="100" alt="Loading" />
                                                            <div className="card-title my-0">
                                                                <small>
                                                                    From <span style={{ color: '#ff7300', fontSize: 25 }}>${item.price}</span>/per night
                                                                </small>
                                                            </div>
                                                            {/* <Link to={`/results/${item.property_id}`} style={{ textDecoration: "none", color: "black" }}> */}
                                                            <small className="text-turncate my-0" onClick={() => { this.handleRecom(item.property_id) }}>{item.name}</small>
                                                            {/* </Link> */}
                                                            <p className='text-capitalize small my-0'>{item.city}</p>
                                                            <p className='small my-0'>{item.bed} bedrooms / sleeps {item.no_people}</p>
                                                            <button className='btn btn-block rounded-0 text-white' style={{ background: '#ec9145' }} onClick={() => { this.handleRecom(item.property_id) }}> View Details</button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {/* see all properties */}
                                        {/* <p>See all {recData.length} properties in {recData[0].city}</p> */}
                                    </li>

                                    <li className="list-group-item ml-0 pl-0">
                                        <h4 className="mb-2">
                                            Build your perfect trip, with Flipkey & TripAdvisor
                                        </h4>
                                        <p className="pl-5 mb-0">Build the sttaic component </p>
                                        <p className="pl-5 text-muted">Pay Online to be covered by
                                            <strong style={{ color: '#066bc8' }} className='px-1' >payment protection </strong> </p>
                                        <div className='d-flex ml-0 pl-0'>
                                            <Icons.Person size={40} />
                                            <div className=''>
                                                <p className="pl-2 mb-0">Real opinions real reviews</p>
                                                <p className="pl-2 text-muted">Genuine guest feedback from 100,000+ reviews </p>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-0 pl-0'>
                                            <Icons.Lock size={40} />
                                            <div>
                                                <p className="pl-2 mb-0">Safe, simple, secure</p>
                                                <p className="pl-2 text-muted">When you pay online with PayPal or by credit/debit card </p>
                                            </div>
                                        </div>
                                        <div className='d-flex ml-0 pl-0'>
                                            <Icons.Clock size={35} />
                                            <div>
                                                <p className="pl-2 mb-0">Quick response times </p>
                                                <p className="pl-2 text-muted">Know where you're staying within 24 hours </p>
                                            </div>
                                        </div>

                                    </li>
                                    <li className="list-group-item">
                                        <p>
                                            Also Consider
                                        </p>
                                    </li>
                                    <li className="list-group-item">
                                        This listing is created and maintained by the homeThis listing is created and maintained by the
                                        homeowner; we can only publish adverts in good faith as we don't own, manage or inspect any of
                                        the properties. We advise you to familiarize yourself with our terms of use.owner; we can only
                                        publish adverts in good faith as we don't own, manage or inspect any of the properties. We
                                        advise you to familiarize yourself with our terms of use.
                                    </li>
                                </ul>
                            </div>
                            {/* ***********************PriceForm************************ */}
                            <div className="col-4 pl-5 pr-0 mt-5 d-none d-xl-block d-md-none">
                                <div className="card bg-light my-5 mr-0 pr-0 sticky-top border" style={{ right: 0 }}>
                                    <div className="ml-2">
                                        <small className=''>Total Cost</small>
                                        <h2 style={{ fontWeight: 600 }}>${property[0].price * this.state.days * this.state.people}<small className="text-muted">
                                            {"/ " + this.state.days} {this.state.days == 1 ? "night" : "nights"}</small></h2>
                                    </div>
                                    <div className="p-2">
                                        <div className="" style={{ background: "#f5f8f9" }}>
                                            {/* Date: from Month and to Month */}
                                            <div className="row px-0 mx-0">
                                                {/* startDate */}
                                                <div className='col-6 p-0 m-0'>
                                                    <DatePicker
                                                        className='border col p-2 '
                                                        placeholderText='Start Date'
                                                        selected={this.state.startDate}
                                                        onChange={this.handleStartDate}
                                                        selectsStart
                                                        startDate={this.state.startDate}
                                                        endDate={this.state.endDate}
                                                        minDate={new Date()}
                                                        shouldCloseOnSelect={true}
                                                        excludeDates={argPassDatePick}
                                                    // monthsShown={2}
                                                    />
                                                </div>
                                                {/* fromDate */}
                                                <div className='col-6 p-0 m-0'>
                                                    <DatePicker
                                                        className='border col p-2'
                                                        placeholderText='End Date'
                                                        selected={this.state.endDate}
                                                        onChange={this.handleEndDate}
                                                        selectsEnd
                                                        startDate={this.state.startDate}
                                                        endDate={this.state.endDate}
                                                        minDate={new Date()}
                                                        shouldCloseOnSelect={true}
                                                        excludeDates={argPassDatePick}
                                                    // excludeDates={[moment(), moment().subtract(1, "days")]}
                                                    // minDate={moment().toDate()} 
                                                    // monthsShown={2}  
                                                    />
                                                </div>
                                            </div>
                                            {/* Guests edit dropdown */}
                                            <div className="row mt-2 mx-0 bg-white">
                                                <div className='col btn-block border m-0 p-0'>
                                                    <Dropdown variant='white' className='rounded-0'>
                                                        <DropdownToggle variant='white' className='rounded-0 w-100 m-0'>
                                                            <Button variant='white' className='p-0 m-0 w-100'>
                                                                {this.state.people} guests
                                                            </Button>
                                                        </DropdownToggle>
                                                        <DropdownMenu alignRight>
                                                            {/* adult */}
                                                            <div style={{ width: "180px" }} className='mx-3'>
                                                                <div className='row p-1'>
                                                                    <div className=' col-6 text-right px-2 lead'>
                                                                        Adults
                                                                        </div>
                                                                    <div className='col-6'>
                                                                        <div className='row  border border-muted'>
                                                                            <div className='col-4  m-0 p-0'>
                                                                                <Button
                                                                                    className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.adultDec}>
                                                                                    -
                                                                                    </Button>
                                                                            </div>
                                                                            <div className='col-4 m-0 p-1'>
                                                                                <div className='text-center'>
                                                                                    {this.state.adult}
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-4  m-0 p-0 text-center'>
                                                                                <Button
                                                                                    className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.adultInc}>
                                                                                    +
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* children */}
                                                                <div className='row p-1'>
                                                                    <div className=' col-6 text-right px-2'>
                                                                        <div className='row'>
                                                                            <div className='col-12 lead my-0 py-0'>
                                                                                Children
                                                                                </div>
                                                                            <div className='col-12 my-0 py-0'>
                                                                                <small className='m-0 p-0'>age 0-16</small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-6'>
                                                                        <div className='row  border border-muted'>
                                                                            <div className='col-4  m-0 p-0'>
                                                                                <Button
                                                                                    className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.childDec}>
                                                                                    -
                                                                                </Button>
                                                                            </div>
                                                                            <div className='col-4 m-0 p-1'>
                                                                                <div className='text-center'>
                                                                                    {this.state.child}
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-4  m-0 p-0 text-center'>
                                                                                <Button
                                                                                    className='lead font-weight-bold p-1 m-0 btn-block btn-light rounded-0' onClick={this.childInc}>
                                                                                    +
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            <div className="py-2 my-2">
                                                {/* 1.toggle dropdown */}
                                                {toggle ? (
                                                    <div className="w-100 ">
                                                        <div className="row justify-content-between px-3">
                                                            <div className="">
                                                                <div className="small">Rate for ${this.state.days} nights</div>
                                                                <div className="small">
                                                                    Tax{" "}
                                                                    <span className="bg-secondary rounded-circle px-1">
                                                                        ?
                                                            </span>
                                                                </div>
                                                                <div className="small">
                                                                    Booking fee{" "}
                                                                    <span className="bg-secondary rounded-circle px-1">
                                                                        ?
                                                            </span>
                                                                </div>
                                                                <div className="small">
                                                                    Owner fees{" "}
                                                                    <span className="bg-secondary rounded-circle px-1">
                                                                        ?
                                                            </span>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div className="small">{this.state.days * property[0].price * this.state.people}</div>
                                                                <div className="small text-right">{Math.round((this.state.days * property[0].price * this.state.people) * 0.1)}</div>
                                                                <div className="small text-right">$60</div>
                                                                <div className="small text-right">$60</div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ) : (
                                                        ""
                                                    )}
                                                {/* Total  */}
                                                <div className="row justify-content-between px-3">
                                                    <div className="lead">Total<small className="text-muted"> (including taxes)</small></div>
                                                    <div className="lead" >${(property[0].price * this.state.days * this.state.people) + (Math.round((this.state.days * property[0].price * this.state.people) * 0.1)) + 60 + 60 +60}</div>
                                                </div>
                                                {/* 2.toggle dropdown */}
                                                {toggle ? (
                                                    <div className="w-100 ">
                                                        <div className="row justify-content-between px-3">
                                                            <div className="">
                                                                <div className="small">Refundable damage deposit</div>
                                                                <div className="small">
                                                                    Total + Deposit
                                                        </div>
                                                            </div>
                                                            <div className="">
                                                                <div className="small">$60</div>
                                                                <div className="small text-right">${(property[0].price * this.state.days * this.state.people) + (Math.round((this.state.days * property[0].price * this.state.people) * 0.1)) + 60 + 60}</div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ) : (
                                                        ""
                                                    )}
                                                {/* show details toggle */}
                                                <div className="row justify-content-between px-3">
                                                    <div className="small text-muted">No Hidden Fees</div>
                                                    <div
                                                        className="small text-info"
                                                        onClick={() =>
                                                            this.setState({ toggle: !this.state.toggle })
                                                        }
                                                    >
                                                        {this.state.toggle ? 'Hide details' : 'Show details'}
                                                    </div>
                                                </div>
                                                {/* Book now button */}
                                                {this.state.enableBookButton ?
                                                    <button className="btn btn-info btn-block font-weight-bold mt-3" onClick={() => this.handleBooking(property[0].price)}>
                                                        Book now
                                                </button> :
                                                    <button disabled className="btn btn-info btn-block font-weight-bold mt-3" onClick={() => this.handleBooking(property[0].price)}>
                                                        Dates not available
                                            </button>
                                                }
                                                {/* Contact owner  */}
                                                <button className="btn btn-outline-secondary btn-block font-weight-bold">
                                                    Contact owner
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-success text-center pb-3 px-2" style={{ fontSize: 15 }}>
                                        Book online with Payment Protection
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-12">
                                    <p>import Vocation and the footer</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                :
                <div>Loading</div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        // data: statefined.reducerCommon.primaryData
        data: state.reducerPropertyDetails.primaryData,
        recom: state.reducerPropertyDetails.recomDetails,
        datesFromR: state.reducerPropertyDetails.availableDates,
        token: state.reducerAuth.token
    }

}

const mapDispatchToProps = dispatch => {
    // return {
    // // getPropertyData: payload => dispatch(getPropertyData(payload))
    // }

    return {
        afterPropData: payload => dispatch(afterPropData(payload)),
        getRecommendations: payload => dispatch(getRecommendations(payload)),
        changeStartDate: payload => dispatch(changeStartDate(payload)),
        changeEndDate: payload => dispatch(changeEndDate(payload)),
        changePrice: payload => dispatch(changePrice(payload)),
        guestDays: payload => dispatch(guestDays(payload)),
        availableDates: payload => dispatch(availableDates(payload)),
        // reviewSubmission: payload => dispatch(reviewSubmission(payload)),
        reviewSubmission: payload => reviewSubmission(payload)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyPage)