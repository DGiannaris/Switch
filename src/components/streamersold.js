import React, { Component } from 'react';


const Search = Input.Search;
const Step = Steps.Step;
const steps = [{
	title: 'Tell us his/her name',
	content: 'Test content 1'
},
{
	title: 'How much do you love him/her?',
	content: 'Test content 2'
},
{
	title: 'Does everything looks fine?',
	content: 'Test content 3'
}]

class AddStreamer extends Component {
	state = {
		visible: false,
		addStreamerVisible: false,
		addStreamerName: '',
		addStreamerStatus: false,
		addStreamerStepsCompleted: false,
		current: 0,
		addStreamerLoveMeter: 2,
		addStreamerIcon: '',
	}

	

	handleAddStreamer = (e) => {
		message.success('Streamer Added!', 2.5)
		this.setState({
			addStreamerModal: false
		})
	}

	addStreamerToStorage = (e) => {
		console.log(e);
		message.success('Added streamer!', 2.5)
		this.setState({
			addStreamerModal: false,
		})
	}

	responseStreamerName = (value) => {
		
		this.setState({
			addStreamerStatus: true
		})
		var name = value
		setTimeout(() => {
			
			this.setState({
				addStreamerStatus: false,
				addStreamerName: name,
				addStreamerIcon: 'http://www.calvarybirmingham.com/wp-content/uploads/2016/12/laughing_donkey.jpg'
			})
			
		}, 2500)
		
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
	}
	prev() {
		const current = this.state.current - 1;
		this.setState({ current });
	}
	render() {
		return (
			<div>
				<Steps current={this.state.current}>
					{steps.map(item => <Step key={item.title} title={item.title} /> )}
				</Steps>
				<div className="steps-content">
					{
						this.state.current == 0
						?
							<div className="cs-search">
								<div className="cs-search-field">
									<p>Type a name and then press Enter</p>
									<Search
										placeholder="Name"
										onSearch={value => this.responseStreamerName(value)}
									/>
								</div>
								<div className="cs-search-result-wrapper">
									<Spin spinning={this.state.addStreamerStatus}>
										<div className="cs-search-result">
											{
												this.state.addStreamerIcon == ''
												? <Icon type="user" />
												: <img src={donkeyUser} />
											}
											<h2>{this.state.addStreamerName || 'Streamer'}</h2>
										</div>
									</Spin>
								</div>
							</div>
						: null
					}

					{
						this.state.current == 1
						?
							<div className="cs-rate">
								<p>Choose how much you love this lad/lass</p>
								<Rate
									count={3}
									defaultValue={2}
									character={<Icon type="heart" />}
									onChange={(value) => { this.setState({addStreamerLoveMeter: value});}}
								/>	
							</div>
						: null
					}

					{
						this.state.current == 2
						? 
							<div className="cs-review">
								<div className="cs-review-text">
									<h2>Recap:</h2>
									<p>You love <span>{this.state.addStreamerName}</span> as much as</p>
									<Rate
										value={this.state.addStreamerLoveMeter}
										disabled={true}
										character={<Icon type="heart" />}
										count={3}
									/>
								</div>
								<div className="cs-review-streamer-image">
									<h2>You know, this one</h2>
									<img src={this.state.addStreamerIcon} />
								</div>
							</div>
						: null
					}
				</div>
				<div className="steps-action">

					{
						this.state.current > 0
						&&
						<Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
						  {
						  	this.state.current == steps.length - 1
						  	? 'No'
						  	: 'Previous'
						  }
						</Button>
					}
					{
						(this.state.current < steps.length - 1)
						&&
						<Button
							type="primary"
							onClick={() => this.next()}
							disabled={(this.state.addStreamerName == '')}
						>
							Next
						</Button>
					}
					{
						this.state.current === steps.length - 1
						&&
						<Button type="primary" onClick={() => this.setState({addStreamerStepsCompleted: true})}>Yes</Button>
					}
					
		        </div>
		    </div>
		)
	}
}