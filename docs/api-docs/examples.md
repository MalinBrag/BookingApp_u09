
### Get Amadeus token

**Request**

curl --request POST \
    --url https://test.api.amadeus.com/v1/security/oauth2/token \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'User-Agent: insomnia/10.0.0' \
    --data grant_type=client_credentials \
    --data client_id= { API_KEY} \
    --data client_secret= { API_SECRET }



### Get flight offers

**Request**

curl --request GET \
    --url 'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=CDG&destinationLocationCode=FCO&departureDate=2024-10-12&adults=1&nonStop=true&currencyCode=USD&max=5' \
    --header 'Authorization: Bearer { TOKEN }' \
    --header 'User-Agent: insomnia/10.0.0'

**Response**

{
	"meta": {
		"count": 5,
		"links": {
			"self": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=CDG&destinationLocationCode=FCO&departureDate=2024-10-12&adults=1&nonStop=true&currencyCode=USD&max=5"
		}
	},
	"data": [
		{
			"type": "flight-offer",
			"id": "1",
			"source": "GDS",
			"instantTicketingRequired": false,
			"nonHomogeneous": false,
			"oneWay": false,
			"isUpsellOffer": false,
			"lastTicketingDate": "2024-10-12",
			"lastTicketingDateTime": "2024-10-12",
			"numberOfBookableSeats": 9,
			"itineraries": [
				{
					"duration": "PT2H",
					"segments": [
						{
							"departure": {
								"iataCode": "CDG",
								"terminal": "2B",
								"at": "2024-10-12T06:10:00"
							},
							"arrival": {
								"iataCode": "FCO",
								"terminal": "1",
								"at": "2024-10-12T08:10:00"
							},
							"carrierCode": "AZ",
							"number": "317",
							"aircraft": {
								"code": "32N"
							},
							"operating": {
								"carrierCode": "AZ"
							},
							"duration": "PT2H",
							"id": "1",
							"numberOfStops": 0,
							"blacklistedInEU": false
						}
					]
				}
			],
			"price": {
				"currency": "USD",
				"total": "227.00",
				"base": "127.00",
				"fees": [
					{
						"amount": "0.00",
						"type": "SUPPLIER"
					},
					{
						"amount": "0.00",
						"type": "TICKETING"
					}
				],
				"grandTotal": "227.00",
				"additionalServices": [
					{
						"amount": "88.30",
						"type": "CHECKED_BAGS"
					}
				]
			},
			"pricingOptions": {
				"fareType": [
					"PUBLISHED"
				],
				"includedCheckedBagsOnly": false
			},
			"validatingAirlineCodes": [
				"AZ"
			],
			"travelerPricings": [
				{
					"travelerId": "1",
					"fareOption": "STANDARD",
					"travelerType": "ADULT",
					"price": {
						"currency": "USD",
						"total": "227.00",
						"base": "127.00"
					},
					"fareDetailsBySegment": [
						{
							"segmentId": "1",
							"cabin": "ECONOMY",
							"fareBasis": "TOLGFR1",
							"brandedFare": "ECOLIGHT",
							"brandedFareLabel": "ECONOMY LIGHT",
							"class": "T",
							"includedCheckedBags": {
								"quantity": 0
							},
							"amenities": [
								{
									"description": "UP TO 50LB 23KG 62LI 158LCM",
									"isChargeable": true,
									"amenityType": "BAGGAGE",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "ADVANCE SEAT RESERVATION",
									"isChargeable": true,
									"amenityType": "PRE_RESERVED_SEAT",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "SNACK",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								}
							]
						}
					]
				}
			]
		},
		{
			"type": "flight-offer",
			"id": "2",
			"source": "GDS",
			"instantTicketingRequired": false,
			"nonHomogeneous": false,
			"oneWay": false,
			"isUpsellOffer": false,
			"lastTicketingDate": "2024-10-12",
			"lastTicketingDateTime": "2024-10-12",
			"numberOfBookableSeats": 9,
			"itineraries": [
				{
					"duration": "PT2H5M",
					"segments": [
						{
							"departure": {
								"iataCode": "CDG",
								"terminal": "2B",
								"at": "2024-10-12T11:40:00"
							},
							"arrival": {
								"iataCode": "FCO",
								"terminal": "1",
								"at": "2024-10-12T13:45:00"
							},
							"carrierCode": "AZ",
							"number": "319",
							"aircraft": {
								"code": "32N"
							},
							"operating": {
								"carrierCode": "AZ"
							},
							"duration": "PT2H5M",
							"id": "3",
							"numberOfStops": 0,
							"blacklistedInEU": false
						}
					]
				}
			],
			"price": {
				"currency": "USD",
				"total": "227.00",
				"base": "127.00",
				"fees": [
					{
						"amount": "0.00",
						"type": "SUPPLIER"
					},
					{
						"amount": "0.00",
						"type": "TICKETING"
					}
				],
				"grandTotal": "227.00",
				"additionalServices": [
					{
						"amount": "88.30",
						"type": "CHECKED_BAGS"
					}
				]
			},
			"pricingOptions": {
				"fareType": [
					"PUBLISHED"
				],
				"includedCheckedBagsOnly": false
			},
			"validatingAirlineCodes": [
				"AZ"
			],
			"travelerPricings": [
				{
					"travelerId": "1",
					"fareOption": "STANDARD",
					"travelerType": "ADULT",
					"price": {
						"currency": "USD",
						"total": "227.00",
						"base": "127.00"
					},
					"fareDetailsBySegment": [
						{
							"segmentId": "3",
							"cabin": "ECONOMY",
							"fareBasis": "TOLGFR1",
							"brandedFare": "ECOLIGHT",
							"brandedFareLabel": "ECONOMY LIGHT",
							"class": "T",
							"includedCheckedBags": {
								"quantity": 0
							},
							"amenities": [
								{
									"description": "UP TO 50LB 23KG 62LI 158LCM",
									"isChargeable": true,
									"amenityType": "BAGGAGE",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "ADVANCE SEAT RESERVATION",
									"isChargeable": true,
									"amenityType": "PRE_RESERVED_SEAT",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "SNACK",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								}
							]
						}
					]
				}
			]
		},
		{
			"type": "flight-offer",
			"id": "3",
			"source": "GDS",
			"instantTicketingRequired": false,
			"nonHomogeneous": false,
			"oneWay": false,
			"isUpsellOffer": false,
			"lastTicketingDate": "2024-10-12",
			"lastTicketingDateTime": "2024-10-12",
			"numberOfBookableSeats": 9,
			"itineraries": [
				{
					"duration": "PT2H10M",
					"segments": [
						{
							"departure": {
								"iataCode": "CDG",
								"terminal": "2B",
								"at": "2024-10-12T18:15:00"
							},
							"arrival": {
								"iataCode": "FCO",
								"terminal": "1",
								"at": "2024-10-12T20:25:00"
							},
							"carrierCode": "AZ",
							"number": "325",
							"aircraft": {
								"code": "32N"
							},
							"operating": {
								"carrierCode": "AZ"
							},
							"duration": "PT2H10M",
							"id": "5",
							"numberOfStops": 0,
							"blacklistedInEU": false
						}
					]
				}
			],
			"price": {
				"currency": "USD",
				"total": "227.00",
				"base": "127.00",
				"fees": [
					{
						"amount": "0.00",
						"type": "SUPPLIER"
					},
					{
						"amount": "0.00",
						"type": "TICKETING"
					}
				],
				"grandTotal": "227.00",
				"additionalServices": [
					{
						"amount": "88.30",
						"type": "CHECKED_BAGS"
					}
				]
			},
			"pricingOptions": {
				"fareType": [
					"PUBLISHED"
				],
				"includedCheckedBagsOnly": false
			},
			"validatingAirlineCodes": [
				"AZ"
			],
			"travelerPricings": [
				{
					"travelerId": "1",
					"fareOption": "STANDARD",
					"travelerType": "ADULT",
					"price": {
						"currency": "USD",
						"total": "227.00",
						"base": "127.00"
					},
					"fareDetailsBySegment": [
						{
							"segmentId": "5",
							"cabin": "ECONOMY",
							"fareBasis": "TOLGFR1",
							"brandedFare": "ECOLIGHT",
							"brandedFareLabel": "ECONOMY LIGHT",
							"class": "T",
							"includedCheckedBags": {
								"quantity": 0
							},
							"amenities": [
								{
									"description": "UP TO 50LB 23KG 62LI 158LCM",
									"isChargeable": true,
									"amenityType": "BAGGAGE",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "ADVANCE SEAT RESERVATION",
									"isChargeable": true,
									"amenityType": "PRE_RESERVED_SEAT",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "SNACK",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								}
							]
						}
					]
				}
			]
		},
		{
			"type": "flight-offer",
			"id": "4",
			"source": "GDS",
			"instantTicketingRequired": false,
			"nonHomogeneous": false,
			"oneWay": false,
			"isUpsellOffer": false,
			"lastTicketingDate": "2024-10-12",
			"lastTicketingDateTime": "2024-10-12",
			"numberOfBookableSeats": 9,
			"itineraries": [
				{
					"duration": "PT2H5M",
					"segments": [
						{
							"departure": {
								"iataCode": "CDG",
								"terminal": "2F",
								"at": "2024-10-12T17:10:00"
							},
							"arrival": {
								"iataCode": "FCO",
								"terminal": "1",
								"at": "2024-10-12T19:15:00"
							},
							"carrierCode": "AF",
							"number": "1404",
							"aircraft": {
								"code": "320"
							},
							"operating": {
								"carrierCode": "NL"
							},
							"duration": "PT2H5M",
							"id": "4",
							"numberOfStops": 0,
							"blacklistedInEU": false
						}
					]
				}
			],
			"price": {
				"currency": "USD",
				"total": "259.80",
				"base": "194.00",
				"fees": [
					{
						"amount": "0.00",
						"type": "SUPPLIER"
					},
					{
						"amount": "0.00",
						"type": "TICKETING"
					}
				],
				"grandTotal": "259.80",
				"additionalServices": [
					{
						"amount": "77.20",
						"type": "CHECKED_BAGS"
					}
				]
			},
			"pricingOptions": {
				"fareType": [
					"PUBLISHED"
				],
				"includedCheckedBagsOnly": false
			},
			"validatingAirlineCodes": [
				"AF"
			],
			"travelerPricings": [
				{
					"travelerId": "1",
					"fareOption": "STANDARD",
					"travelerType": "ADULT",
					"price": {
						"currency": "USD",
						"total": "259.80",
						"base": "194.00"
					},
					"fareDetailsBySegment": [
						{
							"segmentId": "4",
							"cabin": "ECONOMY",
							"fareBasis": "TYL0BALA",
							"brandedFare": "LIGHT",
							"brandedFareLabel": "ECONOMY LIGHT",
							"class": "T",
							"includedCheckedBags": {
								"quantity": 0
							},
							"amenities": [
								{
									"description": "CHECKED BAG 1PC OF 23KG 158CM",
									"isChargeable": true,
									"amenityType": "BAGGAGE",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "SNACK",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "BEVERAGE",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "CHOICE OF STANDARD SEAT",
									"isChargeable": true,
									"amenityType": "BRANDED_FARES",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "UPGRADE ELIGIBILITY",
									"isChargeable": true,
									"amenityType": "BRANDED_FARES",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								}
							]
						}
					]
				}
			]
		},
		{
			"type": "flight-offer",
			"id": "5",
			"source": "GDS",
			"instantTicketingRequired": false,
			"nonHomogeneous": false,
			"oneWay": false,
			"isUpsellOffer": false,
			"lastTicketingDate": "2024-10-12",
			"lastTicketingDateTime": "2024-10-12",
			"numberOfBookableSeats": 9,
			"itineraries": [
				{
					"duration": "PT2H",
					"segments": [
						{
							"departure": {
								"iataCode": "CDG",
								"terminal": "2F",
								"at": "2024-10-12T06:55:00"
							},
							"arrival": {
								"iataCode": "FCO",
								"terminal": "1",
								"at": "2024-10-12T08:55:00"
							},
							"carrierCode": "AF",
							"number": "1204",
							"aircraft": {
								"code": "321"
							},
							"operating": {
								"carrierCode": "AF"
							},
							"duration": "PT2H",
							"id": "2",
							"numberOfStops": 0,
							"blacklistedInEU": false
						}
					]
				}
			],
			"price": {
				"currency": "USD",
				"total": "260.10",
				"base": "194.00",
				"fees": [
					{
						"amount": "0.00",
						"type": "SUPPLIER"
					},
					{
						"amount": "0.00",
						"type": "TICKETING"
					}
				],
				"grandTotal": "260.10",
				"additionalServices": [
					{
						"amount": "77.20",
						"type": "CHECKED_BAGS"
					}
				]
			},
			"pricingOptions": {
				"fareType": [
					"PUBLISHED"
				],
				"includedCheckedBagsOnly": false
			},
			"validatingAirlineCodes": [
				"AF"
			],
			"travelerPricings": [
				{
					"travelerId": "1",
					"fareOption": "STANDARD",
					"travelerType": "ADULT",
					"price": {
						"currency": "USD",
						"total": "260.10",
						"base": "194.00"
					},
					"fareDetailsBySegment": [
						{
							"segmentId": "2",
							"cabin": "ECONOMY",
							"fareBasis": "TYL0BALA",
							"brandedFare": "LIGHT",
							"brandedFareLabel": "ECONOMY LIGHT",
							"class": "T",
							"includedCheckedBags": {
								"quantity": 0
							},
							"amenities": [
								{
									"description": "CHECKED BAG 1PC OF 23KG 158CM",
									"isChargeable": true,
									"amenityType": "BAGGAGE",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "SNACK",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "BEVERAGE",
									"isChargeable": false,
									"amenityType": "MEAL",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "CHOICE OF STANDARD SEAT",
									"isChargeable": true,
									"amenityType": "BRANDED_FARES",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								},
								{
									"description": "UPGRADE ELIGIBILITY",
									"isChargeable": true,
									"amenityType": "BRANDED_FARES",
									"amenityProvider": {
										"name": "BrandedFare"
									}
								}
							]
						}
					]
				}
			]
		}
	],
	"dictionaries": {
		"locations": {
			"FCO": {
				"cityCode": "ROM",
				"countryCode": "IT"
			},
			"CDG": {
				"cityCode": "PAR",
				"countryCode": "FR"
			}
		},
		"aircraft": {
			"320": "AIRBUS A320",
			"321": "AIRBUS A321",
			"32N": "AIRBUS A320NEO"
		},
		"currencies": {
			"USD": "US DOLLAR"
		},
		"carriers": {
			"AF": "AIR FRANCE",
			"AZ": "ITA AIRWAYS",
			"NL": "Amelia International"
		}
	}
}



### Confirm pricing

curl --request POST \
  --url https://test.api.amadeus.com/v1/shopping/flight-offers/pricing \
  --header 'Authorization: Bearer { TOKEN }' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.0.0' \
  --data '{
  "data": {
    "type": "flight-offers-pricing",
    "flightOffers": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-10-12",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "segments": [
              {
                "departure": {
                  "iataCode": "CDG",
                  "terminal": "2B",
                  "at": "2024-10-12T06:10:00"
                },
                "arrival": {
                  "iataCode": "FCO",
                  "terminal": "1",
                  "at": "2024-10-12T08:10:00"
                },
                "carrierCode": "AZ",
                "number": "317",
                "aircraft": {
                  "code": "32N"
                },
                "operating": {
                  "carrierCode": "AZ"
                },
                "duration": "PT2H",
                "id": "1",
                "numberOfStops": 0
              }
            ]
          }
        ],
        "price": {
          "currency": "USD",
          "total": "227.00",
          "base": "127.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "227.00"
        },
        "pricingOptions": {
          "fareType": [
            "PUBLISHED"
          ],
          "includedCheckedBagsOnly": false
        },
        "validatingAirlineCodes": [
          "AZ"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "227.00",
              "base": "127.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "ECONOMY",
                "fareBasis": "TOLGFR1",
                "brandedFare": "ECOLIGHT",
                "brandedFareLabel": "ECONOMY LIGHT",
                "class": "T",
                "includedCheckedBags": {
                  "quantity": 0
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
'

**Response**

{
	"data": {
		"type": "flight-offers-pricing",
		"flightOffers": [
			{
				"type": "flight-offer",
				"id": "1",
				"source": "GDS",
				"instantTicketingRequired": false,
				"nonHomogeneous": false,
				"paymentCardRequired": false,
				"lastTicketingDate": "2024-10-12",
				"itineraries": [
					{
						"segments": [
							{
								"departure": {
									"iataCode": "CDG",
									"terminal": "2B",
									"at": "2024-10-12T06:10:00"
								},
								"arrival": {
									"iataCode": "FCO",
									"terminal": "1",
									"at": "2024-10-12T08:10:00"
								},
								"carrierCode": "AZ",
								"number": "317",
								"aircraft": {
									"code": "32N"
								},
								"operating": {
									"carrierCode": "AZ"
								},
								"duration": "PT2H",
								"id": "1",
								"numberOfStops": 0,
								"co2Emissions": [
									{
										"weight": 99,
										"weightUnit": "KG",
										"cabin": "ECONOMY"
									}
								]
							}
						]
					}
				],
				"price": {
					"currency": "USD",
					"total": "227.00",
					"base": "127.00",
					"fees": [
						{
							"amount": "0.00",
							"type": "SUPPLIER"
						},
						{
							"amount": "0.00",
							"type": "TICKETING"
						},
						{
							"amount": "0.00",
							"type": "FORM_OF_PAYMENT"
						}
					],
					"grandTotal": "227.00",
					"billingCurrency": "USD"
				},
				"pricingOptions": {
					"fareType": [
						"PUBLISHED"
					],
					"includedCheckedBagsOnly": false
				},
				"validatingAirlineCodes": [
					"AZ"
				],
				"travelerPricings": [
					{
						"travelerId": "1",
						"fareOption": "STANDARD",
						"travelerType": "ADULT",
						"price": {
							"currency": "USD",
							"total": "227.00",
							"base": "127.00",
							"taxes": [
								{
									"amount": "1.20",
									"code": "IZ"
								},
								{
									"amount": "1.70",
									"code": "O4"
								},
								{
									"amount": "14.50",
									"code": "QX"
								},
								{
									"amount": "14.30",
									"code": "YQ"
								},
								{
									"amount": "48.60",
									"code": "YR"
								},
								{
									"amount": "19.70",
									"code": "FR"
								}
							],
							"refundableTaxes": "37.10"
						},
						"fareDetailsBySegment": [
							{
								"segmentId": "1",
								"cabin": "ECONOMY",
								"fareBasis": "TOLGFR1",
								"brandedFare": "ECOLIGHT",
								"class": "T",
								"includedCheckedBags": {
									"quantity": 0
								}
							}
						]
					}
				]
			}
		],
		"bookingRequirements": {
			"emailAddressRequired": true,
			"mobilePhoneNumberRequired": true
		}
	},
	"dictionaries": {
		"locations": {
			"FCO": {
				"cityCode": "ROM",
				"countryCode": "IT"
			},
			"CDG": {
				"cityCode": "PAR",
				"countryCode": "FR"
			}
		}
	}
}



  