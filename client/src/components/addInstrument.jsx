import Form from './common/form';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import instrumentService from '../services/instrumentService';
import { toast } from 'react-toastify';

class AddInstrument extends Form {
    state = {
        data: {
            instrumentName: '',
            instrumentDescription: '',
            instrumentBrand: '',
            instrumentPrice: 10,
            instrumentImage: ''
        },
        errors: {}
    }

    schema = {
        instrumentName: Joi.string().min(2).max(255).required(),
        instrumentDescription: Joi.string().min(2).max(2048).required(),
        instrumentBrand: Joi.string().min(2).max(400).required(),
        instrumentPrice: Joi.number().min(10).max(1000000).required(),
        instrumentImage: Joi.string().min(11).max(1024).required().uri().allow("")
    }


    doSubmit = async () => {
        const { state: { data } } = this;
        await instrumentService.addInstrument(data);
        toast("A new Instrument is added to the shop");
        this.props.history.replace("/allinstruments")
    }

    render() {
        return <div className="container">
            <PageHeader titleText="Adding Instrument"></PageHeader>
            <div className="row">
                <div className="col-12">
                    <p>Create new item to the store</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                        {this.renderInput("instrumentName", "Music Instrument Name")}
                        {this.renderInput("instrumentDescription", "Description")}
                        {this.renderInput("instrumentBrand", "Instrument Brand")}
                        {this.renderInput("instrumentPrice", "Instrument Price", "number")}
                        {this.renderInput("instrumentImage", "Instrument Image")}
                        {this.renderButton("Add Instrument")}
                    </form>
                </div>
            </div>
        </div>
    }
}

export default AddInstrument;