import React, { Component } from 'react'
import BaseFormPage from '../../../../base/BaseFormPage'
import NewConsultationPresenter from './NewConsultationPresenter'
import { getObjectUseCase } from '../../../../usecases/object'

export class NewConsultation extends BaseFormPage {
    constructor(props){
        super(props)
        this.presenter = new NewConsultationPresenter (
            this,
            getObjectUseCase(),
        )
    }

  render() {
    return (
      <div>FORM PAGE</div>
    )
  }
}

export default NewConsultation