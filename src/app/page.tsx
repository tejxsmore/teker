import Navbar from "@/components/navbar/Navbar"
import Categories from "../components/Categories"
import Footer from "@/components/Footer"

export default function Home(){
  return <div className="min-h-screen">
    <div className="bg-[#F2613F] h-6"></div>
    <Navbar />
    <Categories />
    <Footer />
  </div>
}