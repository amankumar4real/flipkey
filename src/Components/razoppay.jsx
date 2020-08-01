import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router"
// import {flip} from '../../public'
import { api_link } from '../redux/link'

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

		const data = await fetch(api_link+`/charge`, 
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
			image: 'data:image/jpeg;base64,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',
			handler: function (response) {
				// alert("Payment Completed!")
				history.push(`/results/booking/paymentdone/${ids}`)
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
