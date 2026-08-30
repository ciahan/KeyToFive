import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { TeamMembers } from '../data/data.js'

export default function Team() {
    return (
        <>
            <Header />
            <main>
                <div className = "page">
                    <div className="flex flex-col gap-9">
                        <div className="h0"> Meet the Team! </div>

                        {/* Executives */}
                        {TeamMembers.map((group) => (
                            <>
                                <div className="flex flex-col items-center">
                                    <img
                                    src={group.banner}
                                    style={{ width: 'auto', height: group.height}}
                                    />
                                </div>
                                <div className="teamMembers">
                                    {group.members.map((member) => (
                                    <div className="flex flex-col gap-3 items-center">
                                        <div
                                        key={member.id}
                                        className="flex flex-col gap-1"
                                        >
                                        <h1>
                                            {member.name}
                                        </h1>
                                        <h2 className="highlight-text"> {member.role} </h2>
                                        </div>
                                        <img
                                        src={`/Headshots/${member.headshot}`}
                                        style={{ width: 'auto', height: '400px' }}
                                        />
                                        <h4> {member.bio} </h4>
                                    </div>
                                    ))}
                                </div>
                            </>
                        ))}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}