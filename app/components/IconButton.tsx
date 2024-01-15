
import Image from "next/image"

function IconButton({ onClickFunc, icon} : any) {
  return (
    <button
        onClick={onClickFunc}
    >
        <Image src={icon} width={20} height={20} alt={"icon-button"} />
    </button>
  )
}

export default IconButton