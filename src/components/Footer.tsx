import ThemeToggle from "@/components/ThemeToggle"

export default function Footer(){
    return <div className="border-t border-[#D8D9CF] dark:border-[#404258] p-5 mb-16">
        <div></div>
        <div></div>
        <div>
          <ThemeToggle />
        </div>
    </div>
}