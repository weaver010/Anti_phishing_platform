import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Navbar from '@/Components/Navbar';
import Services from '@/Pages/home/Services';
import AboutUs from '@/Pages/home/AboutUs';
import Footer from '@/Components/Footer';
import ContactUs from '@/Pages/home/ContactUs';
import CTA from '@/Components/CTA';
import PhishingStats from './home/PhishingStats';
import WhyMatters from './home/WhyMatters';
import LatestPhishingTrends from './home/LatestPhishingTrends';
import PhishingAwarenessQuiz from './home/PhishingAwarenessQuiz';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        console.log("Image failed to load");
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    console.log("Welcome component rendered");

    return (
        <>
            <Head title="Anti Phishing" />
            <Navbar />




            <Header auth={auth} />
            <main>
                <Services />
                <AboutUs />
                <WhyMatters/>
                <PhishingStats/>
                <LatestPhishingTrends/>
                <PhishingAwarenessQuiz/>
                <CTA />
                <ContactUs />
                <Footer />

            </main>




        </>
    );
}
