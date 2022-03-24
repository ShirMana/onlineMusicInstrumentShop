import Form from './common/form';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import instrumentService from '../services/instrumentService';
import { toast } from 'react-toastify';

class UpdateInstrument extends Form {
    state = {
        data: {
            _id:'',
            instrumentName: '',
            instrumentDescription: '',
            instrumentBrand: '',
            instrumentPrice: 10,
            instrumentImage: ''
        },
        errors: {}
    }

     schema = {
        _id: Joi.string(),
        instrumentName: Joi.string().min(2).max(255).required(),
        instrumentDescription: Joi.string().min(2).max(2048).required(),
        instrumentBrand: Joi.string().min(2).max(400).required(),
        instrumentPrice: Joi.number().min(10).max(1000000).required(),
        instrumentImage: Joi.string().min(11).max(1024).required().uri().allow("")
    }


    async componentDidMount() {
        const instrumentId = this.props.match.params.id;
        const { data } = await instrumentService.getInstrument(instrumentId);
        this.setState({ data: this.mapToViewModel(data) })
    }

    mapToViewModel(instrument) {
        return {
            _id: instrument._id,
            instrumentName: instrument.instrumentName,
            instrumentDescription: instrument.instrumentDescription,
            instrumentBrand: instrument.instrumentBrand,
            instrumentPrice: instrument.instrumentPrice,
            instrumentImage: instrument.instrumentImage,
        }
    }

    doSubmit = async () => {
        const { state: { data } } = this;
        await instrumentService.editInstrument(data);
        toast("Instrument Is Updated");
        this.props.history.replace("/allinstruments")
    }
    handleCancel = () => {
        this.props.history.push('/allinstruments');
    }

    render() {
        return <div className="container">
            <PageHeader titleText="Update Instrument"></PageHeader>
            <div className="row">
                <div className="col-12">
                    <p>Update instrument details</p>
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
                        {this.renderButton("Update Instrument")}
                        <button className="btn btn-secondary ml-2" onClick={this.handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default UpdateInstrument;