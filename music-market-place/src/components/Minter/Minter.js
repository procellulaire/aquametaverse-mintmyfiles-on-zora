import React from 'react'
import Stepper from 'react-stepper-horizontal/lib/Stepper'
import UploadFile from './UploadFile'

export default function Minter(props) {

  return (
    <div>
      <Stepper steps={ [{title: 'Upload File to IPFS'}, {title: 'Upload Metadata'}, {title: 'Mint NFT'}, {title: 'Get Ready for sale'}] } activeStep={ props.activeStep }/>
      <UploadFile/>
    </div>
  )
}
