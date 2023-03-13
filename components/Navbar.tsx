import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between p-4'>
      <div>Azuri Gaytan</div>
      <div>
        <ul className='flex gap-x-2'>
          <Link href='/'>Home</Link>
          <Link href='/'>Blog</Link>
          <Link href='/'>About</Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
