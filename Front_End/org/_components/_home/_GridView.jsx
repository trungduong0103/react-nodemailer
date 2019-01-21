import React, { Component } from 'react'
import Pagination from './_Pagination.jsx'

export default class GridView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pageOfItems: [],
			fields: {
				"id": "",
				"totalPrice": "",
				"restaurant": this.props.editfood.restaurant,
				"address": this.props.editfood.address,
				"itemName": this.props.editfood.itemName,
				"customerAddress": "",
				"quantity": "0",
				"customerPhoneNumber": "",
				"paymentMethod": "",
				"deliveryTime": "30 minutes"
			},
			feedback: {
				"_id": this.props.editfood._id,
				"content": ""
			}
		}

		this.onChangePage = this.onChangePage.bind(this)
		this.onOrder = this.onOrder.bind(this)
		this.onSendFeedback = this.onSendFeedback.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		this.setState({ fields })

		let feedback = this.state.feedback;
		feedback[e.target.name] = e.target.value;
		this.setState({ feedback })
	}

	onChangePage(pageOfItems) {
		this.setState({ pageOfItems: pageOfItems })
	}

	componentWillReceiveProps(props) {
		this.setState({ pageOfItems: props.allfoods, fields: props.editfood })
	}

	onView(_id) {
		this.props.getFood(_id)
	}

	onViewOrder(_id) {
		this.props.getFood(_id)
	}

	onPlaceFeedback(_id) {
		this.props.getFood(_id)
		let feedback = this.state.feedback;
		feedback["_id"] = _id;
		this.setState({ feedback })
	}

	onSendFeedback() {
		this.props.sendFeedback({
			_id: this.state.feedback._id,
			content: this.state.feedback.content+" - "+sessionStorage.getItem('email')
		});

		let feedback = this.state.feedback;
		feedback["_id"] = "",
			feedback["content"] = "",
			feedback["sender"] = ""
		this.setState({ feedback })
		alert('Thanks for your feedback!')
		$('#feedback').modal('toggle')
	}

	onOrder() {
		this.props.sendOrder({
			id: this.props.editfood.id,
			restaurant: this.props.editfood.restaurant,
			address: this.props.editfood.address,
			itemName: this.props.editfood.itemName,
			customerAddress: this.state.fields.customerAddress,
			customerPhoneNumber: this.state.fields.customerPhoneNumber,
			quantity: this.state.fields.quantity,
			totalPrice: parseInt(this.state.fields.quantity) * parseInt(this.props.editfood.price),
			paymentMethod: this.state.fields.paymentMethod,
			email: sessionStorage.getItem('email')
		})
		alert('Success!')
		this.clearForm()
		$('#ordermodal').modal('toggle')
	}

	clearForm() {
		let fields = this.state.fields;
		fields["customerAddress"] = "",
			fields["customerPhoneNumber"] = "",
			fields["quantity"] = "",
			fields["totalPrice"] = "",
			fields["paymentMethod"] = ""
		this.setState({ fields })
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						{this.state.pageOfItems.map((food, index) => {
							return (
								<div className="col-sm-4" key={index}>
									<div className="card border-lightgrey mb-3 text-center estate-card">
										<img className="card-img-top" style={{ maxHeight: "348px", maxWidth: "348px", height: "348px", width: "348px" }} src={food.imageUrl} alt="" />
										<div className="card-body grid-body">
											<h3 className="card-title">{food.itemName}</h3>
											<hr />

											<p className="card-text" align="left" >
												<b>ID:</b> {food.id} <br />
												<b>Price: </b>{food.price} VND<br />
												<b>Restaurant: </b>{food.restaurant} <br />
												<b>Address: </b> {food.address}<br />
											</p>

											<br />
											{sessionStorage.getItem('email') ? <button type="button" className="btn btn-general" data-toggle="modal" data-target="#ordermodal" onClick={() => this.onViewOrder(food._id)}>Order</button> : null} &nbsp;
												<button className="btn btn-general" data-toggle="modal" data-target="#details" onClick={() => this.onView(food._id)} >Details</button>
											<br />
											<br />
											{sessionStorage.getItem('email') ?
												<div className="card-footer" style={{ backgroundColor: '#ffffff' }}  >
													<button style={{ backgroundColor: "#ffffff", border: "none" }} data-toggle="modal" data-target="#feedback" onClick={() => this.onPlaceFeedback(food._id)}>
														<i className="far fa-comment-alt" style={{ fontSize: '24px' }}></i>
													</button>
												</div> : null
											}
										</div>
									</div>
								</div>


							)
						})}

						<br />
						<div className="modal fade" id="details" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div className="modal-dialog modal-dialog-centered grid-modal-wrapper" role="document">
								<div className="modal-content content-grid">
									<div className="modal-header">
										<h3 className="modal-title">{this.props.editfood.itemName}</h3>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="container-fluid">
											<div className="row">
												<div className="col-sm-6">
													<img id="grid-image" style={{ maxHeight: '500px' }} src={this.props.editfood.imageUrl} alt="" />
												</div>
												&nbsp;
												&nbsp;
                                                <div className="col-sm-4">
													<div className="modal-text">
														<p className="card-text" align="left" >
															<b>ID:</b> {this.props.editfood.id} <br />
															<b>Price: </b>{this.props.editfood.price} VND<br />
															<b>Restaurant: </b>{this.props.editfood.restaurant} <br />
															<b>Address: </b> {this.props.editfood.address}<br /> <br />
															<b>Feedbacks: </b> <br />
															{this.props.editfood.feedback ? Array.from(this.props.editfood.feedback).map((fb, i) => <i key={i}>{fb} <br /></i>) : null}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									</div>

								</div>
							</div>
						</div>

						<div className="modal fade" id="ordermodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">{this.props.editfood.itemName ? this.props.editfood.itemName : null}</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="modal-text" align="left">
											<b>ID:</b> {this.props.editfood.id} <br />
											<b>Price: </b>{this.props.editfood.price} VND<br />
											<b>Restaurant: </b>{this.props.editfood.restaurant} <br />
											<b>Address: </b> {this.props.editfood.address}<br />
										</div>

										<br />
										<form action="">
											<div className="form-row">
												<div className="form-group col-md-6">
													<label>Your Address</label>
													<input type="text" value={this.state.fields.customerAddress || ""} name="customerAddress" className="form-control" placeholder="Your Address" onChange={this.handleChange.bind(this)} />
												</div>
												<div className="form-group col-md-6">
													<label>Your Phone Number</label>
													<input type="text" value={this.state.fields.customerPhoneNumber || ""} name="customerPhoneNumber" className="form-control" placeholder="Your Phone Number" onChange={this.handleChange.bind(this)} />
												</div>
											</div>
											<div className="form-row">
												<div className="form-group col-md-6">
													<label>Quantity</label>
													<input type="text" value={this.state.fields.quantity || ""} name="quantity" className="form-control" placeholder="Quantity" className="form-control" onChange={this.handleChange.bind(this)} />
												</div>
												<div className="form-group col-md-6">
													<label>Payment Method</label>
													<select value={this.state.fields.paymentMethod || ""} name="paymentMethod" className="custom-select" onChange={this.handleChange.bind(this)}>
														<option>Choose One</option>
														<option value="Visa">Visa</option>
														<option value="Cash On Delivery">Cash On Delivery</option>
													</select>
												</div>
											</div>
											<div className="form-row">
												<div className="form-group col-md-6">
													<label>Total</label>
													<input type="text" value={this.state.fields.totalPrice || ""} name="totalPrice" className="form-control" placeholder={parseInt(this.state.fields.quantity)*parseInt(this.props.editfood.price) || ""} disabled />
												</div>
												<div className="form-group col-md-6">
													<label>Expected Delivery</label>
													<input type="text" value="30 minutes" name="deliveryTime" className="form-control" disabled />
												</div>
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
										<button type="button" className="btn btn-primary" onClick={this.onOrder.bind(this)}>Send</button>
									</div>
								</div>
							</div>
						</div>

						<div className="modal fade" id="feedback" tabIndex="-1" role="dialog" aria-labelledby="feedback" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5>Feedback</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<label>Give Us Your Feedback: </label>
										<textarea className="form-control" name="content" id="content" cols="30" rows="10" value={this.state.feedback.content || ""} onChange={this.handleChange.bind(this)} ></textarea>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
										<button type="button" className="btn btn-primary" onClick={this.onSendFeedback.bind(this)}>Send</button>
									</div>
								</div>
							</div>
						</div>

					</div>

					<br />
					<Pagination pageSize={6} initialPage={1} items={this.props.allfoods} onChangePage={this.onChangePage} />
				</div>
			</div>
		)
	}
}
