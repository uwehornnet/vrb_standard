import React, {useEffect, useState} from 'react';

const ShortcodeGenerator = () => {

    const url = vabs_obj ? vabs_obj.url : null;

    const [errorMsg, setErrorMessage] = useState(null);
    const [type, setType] = useState(null);
    const [showCourses, setShowCourses] = useState(false);
    const [showInterestGroups, setShowInterestGroups] = useState(false);
    const [courses, setCourses] = useState(false);
    const [interestGroups, setInterestGroups] = useState(false);
    const [shortcode, setShortcode] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [datenschutz, setDatenschutz] = useState('');
    const [agb, setAgb] = useState('');
    const [ids, setIds] = useState([]);

    const groupBy = (xs, key) => {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    const fetchCourses = async () => {
        const response = courses ? courses : await fetch(`${url}?method=get_all_courses`).then(response => response.json()).then(response => {
            const grouped = groupBy(response, 'kurs_gruppen_name');
            const sorted = {};
            Object.keys(grouped).sort().forEach((key) => {
                sorted[key] = grouped[key]
            });
            return sorted;
        });

        if(response.error){
            setErrorMessage(response.error)
        }else{
            setCourses(response);
        }
    };

    const fetchInterests = async () => {
        const response = interestGroups && interestGroups.length ? interestGroups : await fetch(`${url}?method=get_all_course_groups`).then(response => response.json());
        if(response.error){
            setErrorMessage(response.error)
        }else{
            setInterestGroups(response);
        }
    };

    const generateShortcode = () => {
        let string = `[vabs_booking form="booking" type="${type}" query="${ids.join(',')}" redirect="${redirect}" agb="${agb}" datenschutz="${datenschutz}"]`;
        if(type === 'contact'){
            string = `[vabs_booking form="contact" redirect="${redirect}"]`;
        }
        setShortcode(string)
    };

    const fetchUrls = async () => {
        const urls = await fetch(`${url}?method=get_config_urls`).then(res => res.json())

        setAgb(urls.agb ? urls.agb : '')
        setDatenschutz(urls.dsgvo ? urls.dsgvo : '')
    }

    useEffect(() => {

        fetchUrls()

        if(type === 'course'){
            fetchCourses();
            setShowCourses(true)
        }

        if(type === 'group'){
            fetchInterests();
            setShowInterestGroups(true)
        }
    }, [type]);

    return (
        <div className="shortcodegenerator">
            {errorMsg ? (
                <div className="shortcodegenerator__error">{errorMsg}</div>
            ) : null}

            <div className="shortcodegenerator__section">
                <strong>Welche Art von Formular soll ausgegeben werden?</strong>

                <label>
                    <input
                        type="radio"
                        name="type"
                        onChange={(e) => {
                            if(e.target.checked){
                                setIds([]);
                                setShowInterestGroups(false);
                                setShortcode(null);
                                setType('course');
                            }
                        }}
                    />
                    individuelle Kurse
                </label>

                <label>
                    <input
                        type="radio"
                        name="type"
                        onChange={(e) => {
                            if(e.target.checked){
                                setIds([]);
                                setShowCourses(false);
                                setShortcode(null);
                                setType('group');
                            }
                        }}
                    />
                    Kurse einer Interessengruppe
                </label>

                <label>
                    <input
                        type="radio"
                        name="type"
                        onChange={(e) => {
                            if(e.target.checked){
                                setIds([]);
                                setShowCourses(false);
                                setShowInterestGroups(false);
                                setShortcode(null);
                                setType('contact');
                            }
                        }}
                    />
                    Kontaktformular
                </label>
            </div>

            {showCourses ? (
                <div className="shortcodegenerator__section">
                    <strong>Auswahl der verfügbaren Kurse</strong>
                    {courses ? (
                        <div className="shortcodegenerator__section--lists">
                            {Object.keys(courses).map(name =>(
                                <div className="list" key={name}>
                                    <strong>{name}</strong>
                                    {courses[name].map(course => (
                                        <label key={course.id}>
                                            <input type="checkbox" value={course.id} onChange={(e) => {
                                                if(e.target.checked){
                                                    setIds([
                                                        ...ids,
                                                        course.id
                                                    ])
                                                }else{
                                                    setIds([
                                                        ...ids.filter(id => id !== course.id)
                                                    ])
                                                }
                                            }}/>
                                            {course.name}
                                        </label>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="loader"/>
                    )}
                </div>
            ) : null}

            {showInterestGroups ? (
                <div className="shortcodegenerator__section">
                    <strong>Auswahl der verfügbaren Kursgruppen</strong>
                    {interestGroups && interestGroups.length ? interestGroups.map(interestGroup =>(
                        <label
                            key={interestGroup.id}
                        >
                            <input type="radio" name="interest" value={interestGroup.id} onChange={(e) => {
                                if(e.target.checked){
                                    setIds([
                                        ...ids,
                                        interestGroup.id
                                    ])
                                }else{
                                    setIds([
                                        ...ids.filter(id => id !== interestGroup.id)
                                    ])
                                }
                            }}/>
                            {interestGroup.name}
                        </label>
                    )) : (
                        <div className="loader"/>
                    )}
                </div>
            ) : null}

            <div className="shortcodegenerator__section">
                <strong style={{marginBottom: 0}}>Url zu den Datenschutzrichtlinien</strong>
                <input type="text" value={datenschutz} onChange={(e) => setDatenschutz(e.target.value)}/>

                <strong style={{marginBottom: 0, marginTop: '1rem'}}>Url zu den AGB</strong>
                <input type="text" value={agb} onChange={(e) => setAgb(e.target.value)}/>

                <strong style={{marginBottom: 0, marginTop: '1rem'}}>Weiterleitung nach Abschicken des Formulares</strong>
                <input type="text" value={redirect} onChange={(e) => setRedirect(e.target.value)}/>
                <button className="button button-primary"  onClick={generateShortcode}>Shortcode erstellen</button>
            </div>

            {shortcode ? (
                <div className="shortcodegenerator__section">
                    <strong>Shortcode</strong>
                    <label>Füge den unten abgebildeten Shortcode in deine gewünschte Seite ein und speichere diese.</label>
                    <input type="text" disabled value={shortcode}/>
                </div>
            ) : null}

        </div>
    );
}

export default ShortcodeGenerator;