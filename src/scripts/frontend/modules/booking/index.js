import React, {useEffect, useState, useRef} from 'react';
import {connect} from "react-redux";
import CourseList from "./components/CourseList";
import TravelPeriod from "./components/TravelPeriod";
import ParticipantList from "./components/ParticipantList";
import Billing from "./components/Billing";
import Summary from "./components/summary";
import Success from "./components/Success";

const BookingModule = ({
    type,
    query,
    redirect,
    contact,
    courses,
    participants,
    agb,
    datenschutz
}) => {
    const wrapper = useRef();
    const [loading, setLoading] = useState(false);
    const [success, updateSuccess] = useState(false);
    const [active, setActive] = useState(0)


    console.log(agb === true)

    const sections = [
        'courselist',
        'travelperiod',
        'participants',
        'billing',
        'summary'
    ]

    const formatedDate = (date) => {
        const monthNames = [
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return year + '-' + monthNames[monthIndex] + '-' + String(day).padStart(2, '0');
    };

    const fetchData = async (method, data = {}) => {
        const url = vabs_obj ? vabs_obj.ajax_url : null;
        let response = await fetch(url + '?method=' + method, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        let d = await response.json();
        return d;
    };

    const createNewContact = async (contact) => {
        return await fetchData('create_new_contact', {
            firstname: contact.first_name,
            lastname: contact.last_name,
            email: contact.email,
            mobile: contact.mobile,
            street: contact.street,
            number: contact.number,
            zip_code: contact.zip_code,
            city: contact.city,
            date_from: formatedDate(contact.range[0]),
            date_to: formatedDate(contact.range[1]),
            shorttext: `Interesse: ${contact.interest.split('_')[1]}`,
            note: contact.message,
            lead: 'true'
        });
    };

    const assignInterestToContact = async (id) => {
        return await fetchData('create_new_interest',{
            contact_id: id,
            interest_id: contact.interest.split('_')[0]
        });
    };

    const createSalesOrder = async (id) => {
        return await fetchData('add_sales_order',{
            contact_id: id,
            shorttext: contact.message
        });
    };

    const submitBookingForm = async () => {
        console.log('submitting')
        setLoading(true);
        const mainContactID = await createNewContact(contact);
        console.log(`Main contact ID: ${mainContactID.contact_id}`)
        const assignedInterestToContact = await assignInterestToContact(mainContactID.contact_id);
        const salesOrder = await createSalesOrder(mainContactID.contact_id);
        const salesHeaderID = salesOrder.sales_header_id;

        if(participants.length){
            await submitWithParticipants(mainContactID, salesOrder, salesHeaderID)
        }else{
            await submitWithoutParticipants(mainContactID, salesOrder, salesHeaderID)
        }

    };

    const submitWithoutParticipants = async (mainContactID, salesOrder, salesHeaderID) => {
        Promise.all(courses.map(async (course) => {

            // create contact id for participant
            const ID = await fetchData('create_new_contact', {
                firstname: contact.first_name,
                lastname: contact.last_name,
                email: contact.email,
                mobile: contact.mobile,
                lead: null
            }).catch(err => console.log(`Create Contact Error: ${err}`));
            console.log(`Contact ID: ${ID.contact_id}`);

            // assign interest to created contact
            const interestID = await assignInterestToContact(ID.contact_id);
            console.log(`Interest ID: ${interestID.id}`);

            // add participant to sales line
            const salesLine = await fetchData('add_sales_line', {
                sales_header_id: salesHeaderID,
                object_id: course.id,
                quantity: course.amount ? parseInt(course.amount) : 1,
                date_from: formatedDate(contact.range[0]),
                date_to: formatedDate(contact.range[1]),
                ship_to_contact_id: ID.contact_id,
                // ship_to_contact_id: mainContactID.contact_id,
                line_number: course.index + 1
            }).catch(err => console.log(`SaleLine Error: ${err}`));
            console.log(`Sales Line ID: ${salesLine.sales_line_id}`)

        })).then(() => {
            setLoading(false);
            updateSuccess(true)

        }).catch(err => console.log(`Promise.all Error: ${err}`))
    }

    const submitWithParticipants = async (mainContactID, salesOrder, salesHeaderID) => {
        Promise.all(participants.map(async (participant) => {
            const course = courses.find(course => course.id === participant.course);
            // create contact id for participant
            const ID = await fetchData('create_new_contact', {
                firstname: participant.first_name,
                lastname: participant.last_name,
                email: participant.email,
                mobile: participant.mobile,
                lead: null
            }).catch(err => console.log(`Create Contact Error: ${err}`));

            console.log(`ship contact ID: ${ID.contact_id}`);

            // assign interest to created contact
            const interestID = await assignInterestToContact(ID.contact_id);
            console.log(`Interest ID: ${interestID.id}`);

            // add participant to sales line
            const salesLine = await fetchData('add_sales_line', {
                sales_header_id: salesHeaderID,
                object_id: course.id,
                quantity: course.amount ? parseInt(course.amount) : 1,
                date_from: formatedDate(contact.range[0]),
                date_to: formatedDate(contact.range[1]),
                // ship_to_contact_id: mainContactID.contact_id,
                ship_to_contact_id: ID.contact_id,
                line_number: participant.index + 1
            }).catch(err => console.log(`SaleLine Error: ${err}`));
            console.log(`Sales Line ID: ${salesLine.sales_line_id}`)

        })).then(() => {
            setLoading(false);
            updateSuccess(true)
        }).catch(err => console.log(`Promise.all Error: ${err}`))
    }

    useEffect(() => {
        if(success){
            const session = {
                ID: Date.now(),
                course: courses.map(c => ({
                    name: c.name,
                    qty: c.amount,
                    price: c.price,
                    participants: c.participants
                })),
                customer: {
                    name: `${contact.first_name} ${contact.last_name}`,
                    email: contact.email
                }
            };
            window.sessionStorage.setItem('vrb', JSON.stringify(session));
            wrapper.current.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
            if(redirect){
                window.location.href = redirect;
            }else{
                wrapper.current.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                })
            }
        }
    }, [success]);

    return(
        <div className="vrb__wrapper" id="buchung" ref={wrapper}>
            {success ? (<Success/>) : (
                <>
                    <div className="vrb__wrapper--sections">
                        <div className={sections[active] === 'courselist' ? 'vrb__section active' : 'vrb__section'}>
                            <CourseList type={type} ids={query} active={sections[active] === 'courselist'}/>
                        </div>
                        <div className={sections[active] === 'travelperiod' ? 'vrb__section active' : 'vrb__section'}>
                            <TravelPeriod active={sections[active] === 'travelperiod'}/>
                        </div>
                        <div className={sections[active] === 'participants' ? 'vrb__section active' : 'vrb__section'}>
                            <ParticipantList active={sections[active] === 'participants'}/>
                        </div>
                        <div className={sections[active] === 'billing' ? 'vrb__section active' : 'vrb__section'}>
                            <Billing active={sections[active] === 'billing'}/>
                        </div>
                        <div className={sections[active] === 'summary' ? 'vrb__section active' : 'vrb__section'}>
                            <Summary
                                onSubmit={submitBookingForm}
                                agb={agb}
                                datenschutz={datenschutz}
                                active={sections[active] === 'summary'}
                                onNext={() => {
                                    setActive(active + 1)
                                    document.querySelector('.vrb__section.active').scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    })
                                }}
                                onPrev={() => {
                                    setActive(active - 1)
                                    document.querySelector('.vrb__section.active').scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    })
                                }}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div className="vrb__wrapper--loader"/>
                    ) : null}
                </>
            )}

        </div>
    );
};

const mapStateToProps = state => ({
    contact: state.ContactReducer,
    courses: state.SelectedCourseReducer,
    participants: state.ParticipantReducer
});

export default connect(mapStateToProps)(BookingModule);