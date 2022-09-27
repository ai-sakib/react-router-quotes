import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'

import QuoteForm from './../components/quotes/QuoteForm'

const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote)

    const history = useHistory()
    const addQuoteHadler = newQuoteData => {
        sendRequest(newQuoteData)
    }

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes')
        }
    }, [status, history])
    return (
        <QuoteForm
            isLoading={status === 'pending'}
            onAddQuote={addQuoteHadler}
        />
    )
}
export default NewQuote
