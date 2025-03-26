import { useRef, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { toast } from "react-toastify"

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`

const Label = styled.label``

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  // Criando refs individuais para cada campo
  const nomeRef = useRef(null)
  const emailRef = useRef(null)
  const foneRef = useRef(null)
  const dataNascimentoRef = useRef(null)

  useEffect(() => {
    if (onEdit) {
      // Preenchendo os valores nos inputs quando for edição
      nomeRef.current.value = onEdit.nome || ""
      emailRef.current.value = onEdit.email || ""
      foneRef.current.value = onEdit.fone || ""
      dataNascimentoRef.current.value = onEdit.data_nascimento || ""
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Pegando os valores dos inputs
    const nome = nomeRef.current.value
    const email = emailRef.current.value
    const fone = foneRef.current.value
    const data_nascimento = dataNascimentoRef.current.value

    if (!nome || !email || !fone || !data_nascimento) {
      return toast.warn("Preencha todos os campos!")
    }

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, {
          nome,
          email,
          fone,
          data_nascimento,
        })
        toast.success("Usuário atualizado com sucesso!")
      } else {
        await axios.post("http://localhost:8800", {
          nome,
          email,
          fone,
          data_nascimento,
        })
        toast.success("Usuário cadastrado com sucesso!")
      }
    } catch (error) {
      toast.error("Erro ao salvar os dados!")
    }

    // Limpando os inputs
    nomeRef.current.value = ""
    emailRef.current.value = ""
    foneRef.current.value = ""
    dataNascimentoRef.current.value = ""

    setOnEdit(null)
    getUsers()
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input type="text" name="nome" ref={nomeRef} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input type="email" name="email" ref={emailRef} />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input type="text" name="fone" ref={foneRef} />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input type="date" name="data_nascimento" ref={dataNascimentoRef} />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  )
}

export default Form
