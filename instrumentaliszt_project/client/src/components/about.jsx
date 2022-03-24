import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import citation from "../images/music_citation.png";
import brainMusic from "../images/brain_music.png";

class About extends Component {


    state = {};
    render() {
        return (
            <div className="container">
                <PageHeader titleText="About InstruMentaliszt"></PageHeader>
                <div className="row">
                    <div className="col-12">
                        <div className="mb-4"><img className="rounded mx-auto d-block" src={citation} alt="music citation" /></div>
                        <h3>The InstruMentaliszt online store was created out of a great love for music... <i className="fas fa-music"></i><i className="fas fa-music"></i></h3>
                        <p>Every human culture has music, just as each has language. So it is true that music is a universal feature of the human experience. Like language, music has syntax—rules for ordering elements—such as notes, chords, and intervals—into complex structures. Yet none of these elements has meaning on its own. Rather, it is the larger structure—the melody—that conveys emotional meaning. And it does that by mimicking the prosody of speech. </p>
                        <p>Since music and language share features in common, it is not surprising that many of the brain areas that process language also process music. But this does not mean that music is language. Part of the misunderstanding comes from the way we tend to think about specific areas of the brain as having specific functions. Any complex behavior, whether language or music or driving a car, will recruit contributions from many different brain areas.</p>
                        <p>Music certainly is not a universal language in the sense that you could use it to express any thought to any person on the planet. But music does have the power to evoke deep primal feelings at the core of the shared human experience. It not only crosses cultures, it also reaches deep into our evolutionary past. And it that sense, music truly is a universal language.</p>
                        <div className="mb-4"><img className="rounded mx-auto d-block" src={brainMusic} alt="music processing in the brain" /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;