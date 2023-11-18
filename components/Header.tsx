import Link from 'next/link'

const Header = () => {

  return (
    <header className="sticky top-0 border-b z-10">
      <div className='max-w-4xl mx-auto flex justify-between items-center h-12'>
        <Link href="/">
          TakeakiMiyazawa
        </Link>
        <div>Blog</div>
      </div>
    </header>
  )
}

export default Header;
