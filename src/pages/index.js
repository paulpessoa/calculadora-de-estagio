import Head from 'next/head'
import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Text, Flex} from '@chakra-ui/react';

export default function Home() {
  const [inicioEstagio, setInicioEstagio] = useState('');
  const [fimEstagio, setFimEstagio] = useState('');
  const [valorBolsa, setValorBolsa] = useState(0);
  const [diasEstagiados, setDiasEstagiados] = useState(0);
  const [diasDeRecesso, setDiasDeRecesso] = useState(0);
  const [previsaoBolsaRecesso, setPrevisaoBolsaRecesso] = useState(0);

  const calcularDados = () => {
    // Calcula quantidade de dias estagiados
    const dataInicio = new Date(inicioEstagio);
    const dataFim = new Date(fimEstagio);
    const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
    const dias = Math.round(
      (dataFim.getTime() - dataInicio.getTime()) / umDiaEmMilissegundos
    );
    setDiasEstagiados(dias);

    // Calcula quantidade de dias de recesso
    const diasDeRecesso = Math.round(dias / 12);
    setDiasDeRecesso(diasDeRecesso);

    // Calcula previsão do valor da bolsa que receberá no recesso
    const valorDiarioBolsa = valorBolsa / 30;
    const valorBolsaRecesso = Math.round(valorDiarioBolsa * diasDeRecesso);
    setPrevisaoBolsaRecesso(valorBolsaRecesso);
  };

  return (
    <>
      <Head>
        <title>Calculadora de Estágio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
        <Text m={6} fontSize="2xl" fontWeight="bold"> Calculadora de recesso </Text>
        <FormControl id="inicioEstagio" mb={2}>
          <FormLabel>Início do estágio</FormLabel>
          <Input
            type="date"
            value={inicioEstagio}
            onChange={(e) => setInicioEstagio(e.target.value)}
          />
        </FormControl>
        <FormControl id="fimEstagio" mb={2}>
          <FormLabel>Fim do estágio</FormLabel>
          <Input
            type="date"
            value={fimEstagio}
            onChange={(e) => setFimEstagio(e.target.value)}
          />
        </FormControl>
        <FormControl id="valorBolsa" mb={2}>
          <Input
            type="number"
            value={valorBolsa}
            onChange={(e) => setValorBolsa(e.target.value)}
          />
        </FormControl>
        <Button width='full' colorScheme="blue" onClick={calcularDados} mb={2}>
          Calcular
        </Button>

      <Box mt={2} maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
        <Text mb={2}>Dias estagiados: {diasEstagiados}</Text>
        <Text mb={2}>Dias de recesso: {diasDeRecesso}</Text>
        <Text mb={2}>
          Previsão da bolsa no recesso: R$ {previsaoBolsaRecesso}
        </Text>
        </Box>
        </Box>
      </Flex>
    </>
  )
}
