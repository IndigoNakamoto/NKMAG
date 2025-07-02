'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface CoinData {
  price: number | null
  blockHeight: number | null
  blockSizeGB: number | null
}

interface TickerData {
  bitcoin: CoinData
  litecoin: CoinData
  dogecoin: CoinData
}

const COINS = ['bitcoin', 'litecoin', 'dogecoin'] as const

const logos: { [key: string]: string } = {
  bitcoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  litecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png',
  dogecoin: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
}

const CryptoTicker = () => {
  const [data, setData] = useState<TickerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
            ',',
          )}&vs_currencies=usd`,
        )
        const priceData = await priceResponse.json()

        const bitcoinStatsResponse = await fetch('https://api.blockchair.com/bitcoin/stats')
        const bitcoinStatsData = await bitcoinStatsResponse.json()

        const litecoinStatsResponse = await fetch('https://api.blockchair.com/litecoin/stats')
        const litecoinStatsData = await litecoinStatsResponse.json()

        const dogecoinStatsResponse = await fetch('https://api.blockchair.com/dogecoin/stats')
        const dogecoinStatsData = await dogecoinStatsResponse.json()

        setData({
          bitcoin: {
            price: priceData.bitcoin.usd,
            blockHeight: bitcoinStatsData.data.blocks,
            blockSizeGB: bitcoinStatsData.data.blockchain_size / 1e9,
          },
          litecoin: {
            price: priceData.litecoin.usd,
            blockHeight: litecoinStatsData.data.blocks,
            blockSizeGB: litecoinStatsData.data.blockchain_size / 1e9,
          },
          dogecoin: {
            price: priceData.dogecoin.usd,
            blockHeight: dogecoinStatsData.data.blocks,
            blockSizeGB: dogecoinStatsData.data.blockchain_size / 1e9,
          },
        })
      } catch (error) {
        console.error('Failed to fetch crypto data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const dataInterval = setInterval(fetchData, 60000)

    return () => clearInterval(dataInterval)
  }, [])

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCurrentCoinIndex(prevIndex => (prevIndex + 1) % COINS.length)
    }, 5000)

    return () => clearInterval(cycleInterval)
  }, [])

  const formatPrice = (price: number | null) =>
    price ? `$${price.toLocaleString('en-US')}` : 'N/A'
  const formatNumber = (num: number | null) => (num ? num.toLocaleString('en-US') : 'N/A')
  const formatSize = (size: number | null) => (size ? `${size.toFixed(2)} GB` : 'N/A')

  return (
    <div className="bg-black/10 backdrop-blur-md border-b border-white/10 text-white text-center p-2 text-sm overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCoinIndex}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto flex justify-end items-center space-x-6"
        >
          {loading ? (
            <span>Loading crypto data...</span>
          ) : !data ? (
            <span>Failed to load crypto data.</span>
          ) : (
            <>
              <Image
                src={logos[COINS[currentCoinIndex]]}
                alt={`${COINS[currentCoinIndex]} logo`}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="font-bold uppercase">{COINS[currentCoinIndex]}:</span>
              <span>{formatPrice(data[COINS[currentCoinIndex]].price)}</span>
              <span className="text-gray-400">|</span>
              <span>Block: {formatNumber(data[COINS[currentCoinIndex]].blockHeight)}</span>
              <span className="text-gray-400">|</span>
              <span>Size: {formatSize(data[COINS[currentCoinIndex]].blockSizeGB)}</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CryptoTicker
