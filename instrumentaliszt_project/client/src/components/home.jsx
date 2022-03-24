import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import musicInstrument from "../images/musical_instruments.png";
import zero from "../images/0.jpg";
import one from "../images/1.jpg";
import two from "../images/2.jpg";
import three from "../images/3.jpg";
import four from "../images/4.jpg";


class Home extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="container">
            <div className="container">
                <PageHeader titleText="InstruMentaliszt"></PageHeader>
                <div className="row text-center">
                    <div className="col-12">
                    <h3><i className="fas fa-compact-disc"></i> An amazing online store for Musical Instruments</h3>
                    <p><i className="fas fa-compact-disc"></i> In this store, you can find a variety of musical instruments, at attractive prices.</p>
                    </div>
                </div>
            </div>
            </div>
            <div id="changing_pictures" className="carousel slide rounded m-5" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#changing_pictures" data-slide-to="0" className="active"></li>
            <li data-target="#changing_pictures" data-slide-to="1"></li>
            <li data-target="#changing_pictures" data-slide-to="2"></li>
            <li data-target="#changing_pictures" data-slide-to="3"></li>
            <li data-target="#changing_pictures" data-slide-to="4"></li>
            <li data-target="#changing_pictures" data-slide-to="5"></li>
            <li data-target="#changing_pictures" data-slide-to="6"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src= {musicInstrument} className="d-block w-100 rounded img-fluid" alt="musical instruments"/>
            </div>
            <div className="carousel-item">
              <img src={zero} className="d-block w-100 rounded img-fluid" alt="Keyboard Instruments"/>
              <div className="carousel-caption d-none d-md-block">
                <h1 className="text-white">Keyboard Instruments</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={one} className="d-block w-100 rounded img-fluid" alt="Percussion Instruments"/>
              <div className="carousel-caption d-none d-md-block">
                <h1 className="text-dark">Percussion Instruments</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={two} className="d-block w-100 rounded img-fluid" alt="String Instruments"/>
              <div className="carousel-caption d-none d-md-block">
                <h1>String Instruments</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={three} className="d-block w-100 rounded img-fluid" alt="Wind Instruments"/>
              <div className="carousel-caption d-none d-md-block">
                <h1>Wind Instruments</h1>
              </div>
            </div>
            <div className="carousel-item">
              <img src={four} className="d-block w-100 rounded img-fluid" alt="Electric Instruments"/>
              <div className="carousel-caption d-none d-md-block">
                <h1>Electric Instruments</h1>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#changing_pictures" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#changing_pictures" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
            </React.Fragment>
        )
    }
}

export default Home;