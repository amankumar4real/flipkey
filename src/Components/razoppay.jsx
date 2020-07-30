import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router"
// import {flip} from '../../public'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function RazopPay({total, start, end, ids, token}){
	const history = useHistory()
	// console.log(total, start, end, ids, token)
	// console.log(start.split("T")[0])
	var my_data = {
		property_id: ids,
		from_date: start,
		to_date: end,
		price: total
	}
	
	console.log(my_data)
    
    const [name, setName] = useState('Aman')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://127.0.0.1:5000/charge', 
		{
			method: 'POST' , 
			body: JSON.stringify(my_data),
			headers: {
				"Content-Type": "application/json",
				"Auth": token
			  },
		}).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_i2Oudlj4OnfNoz' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			name: 'Property',
			description: 'Thank you for booking with us!',
			image: 'flip.jpg',
			handler: function (response) {
				alert("Payment Completed!")
				// history.push("/")
			},
			prefill: {
				name,
				email: 'amankumar4real@gmail.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
   	} 

        return(
			<button
				onClick={displayRazorpay}
				className="btn btn-warning"
			>
				Pay with RazorPay
			</button>
	
        )
}

function mapStateToProps(state) {
	return { 
		total: state.reducerPropertyDetails.price,
		start: state.reducerPropertyDetails.startDate,
		end: state.reducerPropertyDetails.endDate,
		ids: state.reducerPropertyDetails.prop_id,
		token: state.reducerAuth.token
	};
}

export default connect(mapStateToProps)(RazopPay)
