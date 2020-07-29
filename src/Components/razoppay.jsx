import React, { useState } from 'react'
// import logo from './logo.svg'

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

function RazopPay(){
    
    const [name, setName] = useState('Aman')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://127.0.0.1:5000/charge', { method: 'POST' }).then((t) =>
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
			image: 'logo192.png',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
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
            <div className="App">
			<header className="App-header">
				<button
					onClick={displayRazorpay}
					className="btn btn-danger"
				>
					Pay
				</button>
			</header>
		</div>
	
        )
}

export default RazopPay
